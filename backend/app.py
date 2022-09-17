import bcrypt
import os
from dotenv import load_dotenv
from twilio.rest import Client
from flask import Flask, request, jsonify, render_template, redirect, session, url_for
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import api

load_dotenv()
app = Flask(__name__)
app.secret_key = 'testAuth'
app.config.from_object('settings')

TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN= os.environ.get('TWILIO_AUTH_TOKEN')
VERIFY_SERVICE_SID= os.environ.get('VERIFY_SERVICE_SID')
SALT_KEY= bcrypt.gensalt()

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

KNOWN_PARTICIPANTS = app.config['KNOWN_PARTICIPANTS']
KNOWN_PARTICIPANTS['natu2002@gmail.com'] = '+12404779604'

@app.route('/', methods=['GET', 'POST'])

def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        if username in KNOWN_PARTICIPANTS:
            session['username'] = username
            send_verification(username)
            return redirect(url_for('verify_passcode_input'))
        error = "User not found. Please try again."
        return render_template('index.html', error = error)
    return render_template('index.html')


@app.route('/', methods=['GET', 'POST'])
# ...
def send_verification(username):
    phone = KNOWN_PARTICIPANTS.get(username)
    client.verify \
        .services(VERIFY_SERVICE_SID) \
        .verifications \
        .create(to=phone, channel='sms')


@app.route('/verifyme', methods=['GET', 'POST'])
def verify_passcode_input():
    username = session['username']
    phone = KNOWN_PARTICIPANTS.get(username)
    error = None
    if request.method == 'POST':
        verification_code = request.form['verificationcode']
        if check_verification_token(phone, verification_code):
            return render_template('success.html', username = username)
        else:
            error = "Invalid verification code. Please try again."
            return render_template('verifypage.html', error = error)
    return render_template('verifypage.html', username = username)


def check_verification_token(phone, token):
    check = client.verify \
        .services(VERIFY_SERVICE_SID) \
        .verification_checks \
        .create(to=phone, code=token)    
    return check.status == 'approved'

#@app.route("/")
#def hello_world():
    #return "<p>Hello, World!</p>"

@app.route("/getuser/", methods=["GET"])
def getUser():
    #takes in {'email': email }
    return jsonify(api.getUser(request.get_json()['email']))

@app.route("/createuser/", methods=["PUT"])
def createUser():
    error = None
    username = session['username']

    if username in KNOWN_PARTICIPANTS:
        password = request.form['password']
        enc = password.encode('utf-8')
        hashed = bcrypt.hashpw(enc, SALT_KEY)
        KNOWN_PARTICIPANTS[username] = hashed
        error = "User not found. Please try again."
        return render_template('index.html', error = error)
    #return render_template('index.html')

    return jsonify(api.uploadUser((request.get_json())))

app.run()

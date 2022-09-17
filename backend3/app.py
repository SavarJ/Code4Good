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

#KNOWN_PARTICIPANTS = app.config['KNOWN_PARTICIPANTS']
#KNOWN_PARTICIPANTS['natu2002@gmail.com'] = '+12404779604'

@app.route('/', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        email = request.get_json()['email']
        user = api.get_user(email)
        #password = request.get_json()['password']
        if api.does_user_exist(email):
            session['username'] = email
            send_verification(user)
            return redirect(url_for('verify_passcode_input'))
        error = "User not found. Please try again."
        return render_template('index.html', error = error)
    return render_template('index.html')

@app.route('/', methods=['GET', 'POST'])
# ...
def send_verification(user):
    phone = user['phoneNumber']
    client.verify \
        .services(VERIFY_SERVICE_SID) \
        .verifications \
        .create(to=phone, channel='sms')

@app.route('/verifyme', methods=['GET', 'POST'])
def verify_passcode_input():
    email = session['username']
    phone = api.get_user(email)['phoneNumber']
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
  # takes in {'email': email } data
  email = request.get_json()['email'].replace('___dot___', '.')
  return jsonify(api.get_user())

@app.route("/createuser/", methods=["PUT"])
def createUser():
    error = None
    username = session['username']
    password = request.get_json()['email']
    if username in KNOWN_PARTICIPANTS:
        password = request.form['password']
        enc = password.encode('utf-8')
        hashed = bcrypt.hashpw(enc, SALT_KEY)
        KNOWN_PARTICIPANTS[username] = hashed
        error = "User not found. Please try again."
        return render_template('index.html', error = error)

    return jsonify(api.uploadUser((request.get_json())))


@app.route('/clockIn/', methods=['POST'])
def clockIn():
  # takes in {"email": "email"}
  tutor_email = request.get_json()['email'].replace('.','___dot___')
  return api.clockIn(tutor_email)

@app.route('/clockOut/', methods=['POST'])
def clockOut():
  # takes in {"email": "email"}
  tutor_email = request.get_json()['email'].replace('.','___dot___')
  return api.clockOut(tutor_email)


@app.route('/getAvailability/', methods=['GET'])
def get_availability():
  pass

@app.route('/setAvailability/', methods=['GET'])
def set_availability():
  pass


@app.route("/createuser/", methods=["PUT"])
def create_user():
  user_profile = request.get_json()
  if (api.verify(user_profile)):
      user_profile['email'].replace('.','___dot___')
      return jsonify(api.upload_user(user_profile))
  else: 
    return {"Error": "Validation Error"}

app.run()
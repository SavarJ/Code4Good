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

def checkPassword(email,password):
  user = api.get_user(email)
  enc = password.encode('utf-8')
  hashed = bcrypt.hashpw(enc, SALT_KEY)
  api.update_user(email, {'password': hashed.decode('utf-8')})
  if user['password'] == hashed: 
    return True


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        email = request.get_json()['email'].replace('.', '___dot___')
        password = request.get_json()['password']
        user = api.get_user(email)
        if api.does_user_exist(email):
            session['username'] = email
            # verify password
            if checkPassword(email, password):
              send_verification(user)
              return {"Status": "Verification Code Sent"}
            else:
              return {"Status": "Wrong Password"}
            #return redirect(url_for('verify_passcode_input'))
        error = "User not found. Please try again."
        return render_template('index.html', error = error)
    return render_template('index.html')

@app.route('/', methods=['GET', 'POST'])
# ...
def send_verification(user):
    print("HERE")
    phone = user['phoneNumber']
    print(phone)
    client.verify \
        .services(VERIFY_SERVICE_SID) \
        .verifications \
        .create(to=phone, channel='sms')

@app.route('/verifyme', methods=['GET', 'POST'])
def verify_passcode_input():
    email = session['username']
    phone = api.get_user(email)['phoneNumber']
    verification_code = request.get_json()['code']
    error = None
    if request.method == 'POST':
        if check_verification_token(phone, verification_code):
            return render_template('success.html', username = email)
        else:
            error = "Invalid verification code. Please try again."
            return render_template('verifypage.html', error = error)
    return render_template('verifypage.html', username = email)
  
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
    email = session['username']
    if api.does_user_exist(email):
        password = request.get_json()['password']
        user = api.get_user(email)
        enc = password.encode('utf-8')
        hashed = bcrypt.hashpw(enc, SALT_KEY)
        user[password] = hashed
        api.update_user(email, user)
        error = "User not found. Please try again."
        return render_template('index.html', error = error)

    return jsonify(api.upload_user((request.get_json())))


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

import os
from dotenv import load_dotenv
from twilio.rest import Client
from flask import Flask, request, jsonify, render_template, redirect, session, url_for
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import api

load_dotenv()
app = Flask(__name__)
app.secret_key = ''
app.config.from_object('settings')

TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN= os.environ.get('TWILIO_AUTH_TOKEN')
VERIFY_SERVICE_SID= os.environ.get('VERIFY_SERVICE_SID')

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

KNOWN_PARTICIPANTS = app.config['KNOWN_PARTICIPANTS']
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/getuser/", methods=["GET"])
def getUser():
  # takes in {'email': email } data
  return jsonify(api.getUser(request.get_json()['email']))

@app.route("/createuser/", methods=["PUT"])
def createUser():
  return jsonify(api.uploadUser((request.get_json())))

app.run()
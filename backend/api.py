from datetime import datetime
import firebase_admin
from firebase_admin import credentials, db
import json

cred = credentials.Certificate("jream-6e78b-4dc9a2d412e6.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://jream-6e78b-default-rtdb.firebaseio.com/',
    'databaseAuthVariableOverride': {
        'uid': 'my-service-worker'
    }
})

ref = db.reference('/')

def writeJSON(filename, data):
    with open(filename, 'w') as outfile:
        json.dump(data, outfile, indent=4,sort_keys=True)
    return True

def readJSON(filename):
    with open(filename, 'r') as infile:
        data = json.load(infile)
    return data

# api for managing new users

def verify(data):
    required_fields = ['password', 'fname', 'lname', 'birthday','phoneNumber', "role"]
    for field in required_fields:
      if field not in data:
        return False
    # verify that role is selected first. Then check role specific required fields
    return verify_tutor(data) if data['role'] == tutor else verify_student(data)

def verify_tutor():
  # specialized fields to verify for incoming tutor
  required_fields = ['hiring', 'bio']
  for field in required_fields:
    if field not in data:
      return False
  return True

def verify_student():
  # specialized fields to verify for incoming student
  required_fields = ['gradingScale', 'grades']
  for field in required_fields:
    if field not in data:
      return False
  return True

def upload_user_by_file(file):
  users = ref.child(f'users/')
  data = readJSON(file)
  users.update(data)
  
def upload_user(data):
  users = ref.child(f'users/')
  users.update(data)
  return users
  
def get_user(email): 
  users = ref.child(f'users/{email}')
  return users.get()

def update_user(email, data):
  users = ref.child(f'users/{email}')
  users.update(data)
  return users
  
# availability for tutors now  
availableTutors = ref.child('availableTutors/')

# clockin/out time
clocks = ref.child('clocks/')
tutoringHistory = ref.child('tutoringHistory/')

# get all available tutors:
def get_availability():
  return availableTutors.get()

# Tutor clocking in
def clockIn(tutor_email: str):
  # create a new clock in for the tutor in the clocks table
  user = get_user(tutor_email)
  availableTutors.update({tutor_email: {'zoom': user.get('zoom'), 'sessionStartTime': None, 'available': True, 'clockInTime': datetime.now().isoformat() }})
  return True

# clocking out
def clockOut(tutor_email:str):
  # Add the clock out time in the clocks table
  # remove the tutor from the available tutors
  availability = get_availability()
  tutor_info = availability.pop(tutor_email)
  availableTutors.set(availability)
  now = datetime.now()
  clocked_in_hours = (now - datetime.fromisoformat(tutor_info['clockInTime'])).total_seconds()/3600
  tutor = get_user(tutor_email)
  tutor['data']['total_hours'] += clocked_in_hours
  update_user(tutor_email, tutor)
  #clocks.set({"test": "est"})
  #print({tutor_info['clockInTime']: now.isoformat()})
  clocks.child(tutor_email).update({tutor_info['clockInTime'].replace('.','-'): now.isoformat().replace('.','-')})
  return True
  
# student requesting a tutor
def startSession(tutor_email:str):
    # get the user from availableTutors
    tutor = availableTutors.child(tutor_email).get()
    availableTutors.update({tutor_email: {'sessionStartTime': datetime.now().isoformat(), 'available': False}})
    return tutor.get('zoom')

# student ending the session
def endSession(tutor_email:str):
    tutor = availableTutors.child(tutor_email).get()
    endTime = datetime.now()
    availableTutors.child(tutor_email).delete()
    # put this tutoring session into the tutoring history


# format for printing data
# def printData():
#   ref = db.reference('/')
#   print(ref.get())

#upload_user_by_file('exampleTutor.json')
# print(get_user('student@email___dot___com'))
# setAvailability('student@email___dot___com', True)
clockIn('tutor@email___dot___com')
print(get_availability())
clockOut('tutor@email___dot___com')
# print(get_availability())

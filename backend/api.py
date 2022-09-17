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


def uploadUserByFile(file):
  users = ref.child(f'users/')
  data = readJSON(file)
  users.update(data)
  
def uploadUser(data):
  users = ref.child(f'users/')
  users.update(data)
  
def getUser(email): 
  users = ref.child(f'users/{email}')
  return users.get()
  
# availability for tutors now  


availableTutors = ref.child('availableTutors/')

clocks = ref.child('clocks/')
tutoringHistory = ref.child('tutoringHistory/')

# get all available tutors:
def get_availability():
  return availableTutors.get()

# Tutor clocking in
def clockIn(tutor_email: str):
  # create a new clock in for the tutor in the clocks table
  user = getUser(tutor_email)
  availableTutors.update({tutor_email: {'zoom': user.get('zoom'), 'sessionStartTime': None, 'available': True }})
  return True

# clocking out
def clockOut(tutor_email:str):
  # Add the clock out time in the clocks table
  # remove the tutor from the available tutors
  availability = get_availability()
  availability.pop(tutor_email)
  availableTutors.set(availability)
  return True
  
# student requesting a tutor
def startSession(tutor_email:str):
    # get the user from availableTutors
    tutor = availableTutors.child(tutor_email).get()
    availableTutors.update({tutor_email: {'sessionStartTime': datetime.now().isoformat(), 'available': False,}})
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

# uploadUser('exampleStudent.json')
# print(getUser('student@email___dot___com'))
# setAvailability('student@email___dot___com', True)
clockIn('student@email___dot___com')
print(get_availability())
# clockOut('student@email___dot___com')
# print(get_availability())

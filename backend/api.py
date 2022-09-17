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

def uploadUser(file):
  users = ref.child(f'users/')
  data = readJSON(file)
  users.update(data)
  
def getUser(email): 
  users = ref.child(f'users/{email}')
  return users.get()
  
# availability for tutors now  


availableTutors = ref.child('availableTutors/')

clocks = ref.child('clocks/')
tutoringHistory = ref.child('tutoringHistory/')

# Tutor clocking in
def clockIn(tutor_email: str):
  # create a new clock in for the tutor in the clocks table

  user = getUser(tutor_email)
  availableTutors.update({tutor_email: {'zoom': user.get('zoom'), 'sessionStartTime': None, 'available': True, }})
  return True

def clockOut(tutor_email:str):
  # Add the clock out time in the clocks table
  # remove the tutor from the available tutors
  availableTutors.update({tutor_email: {'available': False,}})
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
setAvailability('student@email___dot___com', False)

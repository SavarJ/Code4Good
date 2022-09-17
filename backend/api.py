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

# This is when the tutor marks themselves as available
def setAvailability(email: str, availability: bool) -> str:
  if availability:
    user = getUser(email)
    availableTutors.update({email: {'zoom': user.get('zoom'), 'startTime': None, 'available': True, 'sessionStarted': False}})
    return True
  else:
    user = getUser(email)
    availableTutors.update({email: {'zoom': user.get('zoom'), 'startTime': None, 'available': False, 'sessionStarted': False}})
  
def getAvailableTutor(tutor_email:str):
    # get the user from availableTutors
    tutor = availableTutors.child(tutor_email).get()
    availableTutors.update({tutor_email: {'zoom': tutor.get('zoom'), 'startTime': datetime.now().isoformat(), 'available': False, 'sessionStarted': True}})
    return tutor.get('zoom')

def endSession(tutor_email:str):
    tutor = availableTutors.child(tutor_email).get()
    startTime = datetime.fromisoformat(tutor.get('startTime'))
    endTime = datetime.now()
    availableTutors.child(tutor_email).delete()
    # put this tutoring session into the tutoring history
    tutoringHistory = ref.child('tutoringHistory/')
    tutoringHistory.update({'tutor_email': tutor_email, 'startTime': startTime.isoformat(), 'endTime': endTime.isoformat() })


# format for printing data
# def printData():
#   ref = db.reference('/')
#   print(ref.get())

# uploadUser('exampleStudent.json')
# print(getUser('student@email___dot___com'))
# setAvailability('student@email___dot___com', True)
setAvailability('student@email___dot___com', False)

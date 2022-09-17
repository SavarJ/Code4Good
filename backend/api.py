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

def uploadUserByFile(file):
  users = ref.child(f'users/')
  data = readJSON(file)
  users.update(data)
  
def uploadUser(data):
  users = ref.child(f'users/')
  #users.update(data)
  
def getUser(email): 
  users = ref.child(f'users/{email}')
  return users.get()
  
# availability for tutors now  

def setAvailability():
  availableTutors = ref.child('availableTutors/')
  # not finished yet, switching to debugging flask
  # notes learned: firebase does not support lists
  availableTutors.update({'a': ' hi', 'b': 'c'})

# format for printing data
# def printData():
#   ref = db.reference('/')
#   print(ref.get())

uploadUser('exampleStudent.json')
print(getUser('student@email___dot___com'))
setAvailability()

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

def writeJSON(filename, data):
    with open(filename, 'w') as outfile:
        json.dump(data, outfile, indent=4,sort_keys=True)
    return True

def readJSON(filename):
    with open(filename, 'r') as infile:
        data = json.load(infile)
    return data



# api for managing 

def uploadUser(file):
  ref = db.reference('/users/')
  data = readJSON(file)
  ref.update(data)
  
def getUser(email): 
  ref = db.reference(f'/users/{email}')
  return ref.get()
  
# format for printing data
# def printData():
#   ref = db.reference('/')
#   print(ref.get())
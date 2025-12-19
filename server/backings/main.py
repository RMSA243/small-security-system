from  flask import Flask, request, jsonify
import subprocess
from cryptography.fernet import Fernet
import json
import secrets

#from flask_cors import CORS




app = Flask(__name__)

#generating encryption key. will save this securely if go to production stage this temp for current IS project purposes
key = Fernet.generate_key()
cipher = Fernet(key)

#temporary in-memory database for this project only afterwards for production can use mongoDb
database = {}

#placeholder ZoKrates helper functions, will add ZKP integration afterrwards
def zokrates_compute_witness(inputs):
    #'compute-witness' to prepare proof inputs
    #converting inputs to expected string format
    input_str = " ".join(str(i) for i in inputs)
    subprocess.run(["zokrates", "compute-witness", "-a"] + input_str.split())


def zokrates_generate_proof():
    #'generate-proof' to produce a ZKP
    subprocess.run(["zokrates", "generate-proof"])

def zokrates_verify_proof(proof_data):
    #'verify' to check proof validity
    result = subprocess.run(["zokrates", "verify"], input=proof_data.encode())
    #result = subprocess.run(["zokrates", "verify"], capture_output=True, text=True) #no need for proof data input in func
    return result.returncode == 0  #should be true if verification check passes


#2nd p

#en-crypting data using Fernet's AES encryption, symmetric encryption
def encrypt_data(data):
    return cipher.encrypt(data.encode())

#decrypting encrypted data back to its original form.
def decrypt_data(encrypted_data):
    return cipher.decrypt(encrypted_data).decode()


#Endpoint for secure storage of card information after getting it
@app.route('/store_card', methods=['POST'])
def store_card():
    #Stores encrypted card info
    card_info = request.json.get('card_info')  #gett card details from the req
    user_id = request.json.get('user_id')#Unique identifier for user

    #now encrypting card's info before storing it
    encrypted_card = encrypt_data(card_info)
    #saving encrypted data in the in-memory database, in encrypted form
    database[user_id] = encrypted_card

    return jsonify({"message": "Congrats, Card info stored securely.\n"}), 201


#endpoint to retrieve and decrypt card info
@app.route('/retrieve_card', methods=['POST'])
def retrieve_card():
    user_id = request.json.get('user_id') #user ID for data loopup for card in database


    #checking if that user's card info exists in the database
    if user_id in database:
        encrypted_card = database[user_id]       #geting encrypted card info from db
        card_info = decrypt_data(encrypted_card) #decrypting that card info
        return jsonify({"card_info": card_info}), 200  #returning that decrypted card info
    else:
        return jsonify({"error": "User not found."}), 404 #no user found message


#end of 2nd p

#biometeric end point for token can be added here with 3rd pre

#3rd p

#endpoint to generates a proof using ZoKrates based on provided inputs
@app.route('/generate_proof', methods=['POST'])
def generate_proof():
    inputs = request.json.get('inputs')#Inp for proof generation

    #runing ZoKrates to compute witness and generate proof
    zokrates_compute_witness(inputs)
    zokrates_generate_proof()

    try:
        with open("proof.json", "r") as proof_file:
            proof_data = json.load(proof_file)
    except FileNotFoundError:
        return jsonify({"error": "Proof generation failed."}), 500
    
    #cleaning up the proof file after reading
    #os.remove("proof.json") #for this import os

    #storing proof data temporarily in local db
    user_id = request.json.get('user_id')
    database[f"{user_id}_proof"] = proof_data

    return jsonify({"message": "Congrats: proof generated successfully.\n", "proof": proof_data}), 201


#endpoint to Verifies a previously generated proof using ZoKrates
@app.route('/verify_proof', methods=['POST'])
def verify_proof():
    user_id = request.json.get('user_id')
    proof_data = database.get(f"{user_id}_proof")

    if not proof_data:
        return jsonify({"error": "Sorry, proof not found for this user"}), 404
    

    #now runing ZoKrates to verify command and check the result
    try:
        verified = zokrates_verify_proof(proof_data)
    except Exception as e:
        return jsonify({"error": f"sorry, Proof verification failed: {str(e)}"}), 500


    if verified:
        return jsonify({"message": "Proof verification successful. \n"}), 200
    else:
        return jsonify({"error": "Sorry, proof verification failed. Try again later \n"}), 403

#end of 3rd p

#4th sec

#Endpoint generating a secure token for a user after biometric verification on client-side
@app.route('/generate_biometric_token', methods=['POST'])
def generate_biometric_token():
    user_id = request.json.get('user_id')

    #generating a secure random token
    token = secrets.token_hex(16)

    #storing token in local database associated with the user
    database[f"{user_id}_token"] = token
    return jsonify({"biometric_token": token}), 200


#endpoint to Simulate a biometric verification by validating a secure token
@app.route('/biometric_verification', methods=['POST'])
def biometric_verification():
    token = request.json.get('biometric_token')
    user_id = request.json.get('user_id')
    stored_token = database.get(f"{user_id}_token")#should come from client's bio check, after production

    if stored_token == token:
        return jsonify({"message": "Congrats: Biometric verification successful"}), 200
    else:
        return jsonify({"error": "Sorry, Biometric verification failed"}), 403


#end of 4p

# Basic home route to test Flask
@app.route("/", methods=['POST','GET'])
def home():
    return "Happy, Privacy-Pay Secure Payment System is running!"

if __name__ == '__main__':
    app.run(ssl_context='adhoc', debug=True, port=8080)  #run with HTTPS in development SSL secure add Certificate at the production time
    #use this to run https://127.0.0.1:8080/


#cors = CORS(app, origins='*')

#@app.route("/api/users", methods=['GET'])


#def users():
    #return jsonify(
       # {
           # "users": [
            #    'Muhammad Ali',
             #   'Jack',
              #  'Peter'
    #        ]
    #    }
    #)

    
#if __name__ == "__main__":
#    app.run(debug = True, port=8080)
    
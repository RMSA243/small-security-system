import axios from 'axios';

const API_BASE_URL = 'https://127.0.0.1:8080';  //backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//handling API requests
export const storeCard = (userId, cardInfo) => 
    api.post('/store_card', { user_id: userId, card_info: cardInfo });

export const retrieveCard = (userId) => 
    api.post('/retrieve_card', { user_id: userId });

export const generateBiometricToken = (userId) => 
    api.post('/generate_biometric_token', { user_id: userId });

export const verifyBiometricToken = (userId, token) => 
    api.post('/biometric_verification', { user_id: userId, biometric_token: token });

export const generateProof = (userId, inputs) => 
    api.post('/generate_proof', { user_id: userId, inputs });

export const verifyProof = (userId) => 
    api.post('/verify_proof', { user_id: userId });

export default api;
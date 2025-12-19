import React, { useState } from 'react';
import { generateBiometricToken } from '../services/apiService';

const BiometricToken = () => {
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    const handleGenerateToken = async () => {
        try {
            const response = await generateBiometricToken(userId);
            setToken(response.data.biometric_token);
            alert('Congrats: Biometric token generated successfully.');
        }
        catch (error)
        {
            alert('Error generating biometric token.');
        }
        
    };

    return (
        <div>
            <h2>Generate Biometric Token</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={handleGenerateToken}>Generate Token</button>
            {token && <p>Biometric Token: {token}</p>}
        </div>
    );
};

export default BiometricToken;
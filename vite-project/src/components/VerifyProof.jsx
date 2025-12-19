import React, { useState } from 'react';
import { verifyProof } from '../services/apiService';

const VerifyProof = () => {
    const [userId, setUserId] = useState('');
    const [verificationResult, setVerificationResult] = useState('');

    const handleVerifyProof = async () => {
        try {
            const response = await verifyProof(userId);
            setVerificationResult('Congrats: Proof verification successful.');
        }
        catch (error)
        {
            setVerificationResult('Sorry sir, proof verification failed.');
        }

    };

    return (
        <div>
            <h2>Verify Proof</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={handleVerifyProof}>Verify Proof</button>
            {verificationResult && <p>{verificationResult}</p>}
        </div>

    );


};


export default VerifyProof;
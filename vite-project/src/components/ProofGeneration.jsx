import React, { useState } from 'react';
import { generateProof } from '../services/apiService';

const ProofGeneration = () => {
    const [userId, setUserId] = useState('');
    const [inputs, setInputs] = useState('');
    const [proof, setProof] = useState(null);

    const handleGenerateProof = async () => {
        try {
            const inputArray = inputs.split(',').map(Number); //Converting csv comma-separated input to array

            const response = await generateProof(userId, inputArray);

            setProof(response.data.proof);
            alert('Congrats: proof generated successfully.');

        } 
        catch (error)
        {
            alert('Sorry, Error while generating proof');
        }

    };

    return (
        <div>
            <h2>Generate Proof</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Inputs: comma-separated"
                value={inputs}
                onChange={(e) => setInputs(e.target.value)}
            />
            
            <button onClick={handleGenerateProof}>Generate Proof</button>
            {proof && <pre>{JSON.stringify(proof, null, 2)}</pre>}

        </div>
    );
};

export default ProofGeneration;
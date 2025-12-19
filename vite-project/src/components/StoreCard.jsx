import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { storeCard } from '../services/apiService';

const StoreCard = () => {
    const [cardInfo, setCardInfo] = useState('');
    const [userId, setUserId] = useState('');

  
    //const [userId, setUserId] = useState('');

    const handleStoreCard = async () => {
        try {
            await storeCard(userId, cardInfo);
            alert('Congrats: card information stored successfully.');
        } catch (error) {
            alert('Sorry, error while storing card information.');
        }
    };


    return (
        <div>
            <h2>Store Card</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Card Info"
                value={cardInfo}
                onChange={(e) => setCardInfo(e.target.value)}
            />
            <button onClick={handleStoreCard}>Submit</button>
        </div>
    );


};


export default StoreCard;

//storecard component
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { retrieveCard } from '../services/apiService';

const RetrieveCard = () => {
    const { userId } = useContext(AppContext);
    const [cardInfo, setCardInfo] = useState('');

    const handleRetrieveCard = async () => {
        try {
            const response = await retrieveCard(userId);
            setCardInfo(response.data.card_info);
        }
        catch (error)
        {
            alert('Sorry, error in retrieving card information.');
        }

    };


    return (
        <div>
            <h2>Retrieve Card</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={handleRetrieveCard}>Retrieve</button>
            {cardInfo && <p>Card Info: {cardInfo}</p>}
        </div>
    );

};


export default RetrieveCard;
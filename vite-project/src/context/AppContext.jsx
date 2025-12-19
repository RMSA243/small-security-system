import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [biometricToken, setBiometricToken] = useState('');
    const [cardInfo, setCardInfo] = useState('');

    return (
        <AppContext.Provider value={{
            userId,
            setUserId,
            biometricToken,
            setBiometricToken,
            cardInfo,
            setCardInfo
        }}>
            {children}
        </AppContext.Provider>
    );
};

//to manage global state across applications
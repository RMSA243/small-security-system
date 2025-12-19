import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import axios from "axios";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreCard from './components/StoreCard';
import RetrieveCard from './components/RetrieveCard';
import BiometricToken from './components/BiometricToken';
import ProofGeneration from './components/ProofGeneration';
import VerifyProof from './components/VerifyProof';

const App = () => {
  return (
      <Router>
          <div style={{ backgroundColor: "gray", padding: "30px", border: "solid" }}>
              <h1>Privacy-Pay</h1>

              <Routes>
                  <Route path="/store-card" element={<StoreCard />} />
                  <Route path="/retrieve-card" element={<RetrieveCard />} />
                  <Route path="/biometric-token" element={<BiometricToken />} />
                  <Route path="/generate-proof" element={<ProofGeneration />} />
                  <Route path="/verify-proof" element={<VerifyProof />} />
              </Routes>

          </div>
      </Router>
  );
};

export default App;

// function App() {
//   const [count, setCount] = useState(0)

//   //to display
//   const[array, setArray] = useState([]);


//   const fetchAPI = async() => {
//     const response = await axios.get("http://localhost:8080/api/users");
//     console.log(response.data.users);
//     setArray(response.data.users);
//   };


//   useEffect( () => {
//     fetchAPI();
//   }, [])

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
        
//           {
//             array.map( (user, index) => (
//               <div key={index}>
//               <span>{user}</span>
//               <br></br>
//               </div>
//             ) )
//           }
          
        
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

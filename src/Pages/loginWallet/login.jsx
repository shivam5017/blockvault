import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../../Provider/walletContext'; // Import WalletContext
import {
  Heading,
  LOGIN_HEADING_CONTAINER,
  Sub_Heading,
  Sub_Heading_B,
  LOGIN_MAIN_SEED_CONTAINER,
  LOGIN_SEED_HEADING_CONTAINER,
  LOGIN_SEED_BLOCK,
  LOGIN_BUTTON_CONTAINER,
  LOGIN_BUTTON
} from "../styled";

const Login = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { setSeedPhrase, restoreWalletFromSeed } = useContext(WalletContext); // Use the context to set wallet data

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const words = pastedText.split(' ');

    words.forEach((word, index) => {
      if (index < inputRefs.current.length) {
        inputRefs.current[index].value = word;
      }
    });
  };

  const clearAllFields = () => {
    inputRefs.current.forEach((input) => {
      if (input) input.value = '';
    });
  };

  const handleLoginClick = async () => {
    const seedPhrases = inputRefs.current.map((input) => input.value);
    const mnemonic = seedPhrases.join(' ');
    setSeedPhrase(mnemonic);
    console.log(seedPhrases, 'myphrase');
  
    try {
      // Restore the wallet with the provided seed phrase
      await restoreWalletFromSeed(0, mnemonic); // Passing seed phrase directly
      
      // Redirect to the dashboard after the wallet is successfully restored
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="container">
      <LOGIN_HEADING_CONTAINER>
        <Heading>Log In to Wallet</Heading>
        <Sub_Heading_B>Provide us with your wallet's seed phrase in order to use it inside the app</Sub_Heading_B>
        <Sub_Heading>Import from Private Key</Sub_Heading>
      </LOGIN_HEADING_CONTAINER>

      <LOGIN_MAIN_SEED_CONTAINER>
        <LOGIN_SEED_HEADING_CONTAINER>
          <Sub_Heading>Seed Phrases</Sub_Heading>
          <Sub_Heading_B className="clear-button" onClick={clearAllFields}>Clear All</Sub_Heading_B>
        </LOGIN_SEED_HEADING_CONTAINER>

        <div>
          {Array.from({ length: 12 }).map((_, index) => (
            <LOGIN_SEED_BLOCK
              key={index}
              type="text"
              placeholder={`Seed ${index + 1}`}
              maxLength="15"
              ref={(el) => (inputRefs.current[index] = el)}
              onPaste={index === 0 ? handlePaste : null}
            />
          ))}
        </div>
      </LOGIN_MAIN_SEED_CONTAINER>

      <LOGIN_BUTTON_CONTAINER>
        <LOGIN_BUTTON onClick={handleLoginClick}>Log In</LOGIN_BUTTON>
      </LOGIN_BUTTON_CONTAINER>
    </div>
  );
};

export default Login;

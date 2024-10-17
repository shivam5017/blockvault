import React, { createContext, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

// Create the context
export const WalletContext = createContext();

// Create the provider component
export const WalletProvider = ({ children }) => {

  const [wallets, setWallets] = useState([]);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);  // Changed to null initially

  // Helper function to create an HD node with a specific index
  const createWalletWithIndex = useCallback((index) => {
    if (!seedPhrase) {
      console.error('Seed phrase is not set');
      return null; // or throw an error
    }
   
    const hdNode = ethers.HDNodeWallet.fromPhrase(seedPhrase, `m/44'/60'/0'/0/${index}`);
    return {
      id: index, // Use index as the ID for easy retrieval
      index, // Store the index for restoring later
      address: hdNode.address,
      privateKey: hdNode.privateKey,
      publicKey: hdNode.publicKey,
      mnemonic: hdNode.mnemonic.phrase,
      path: hdNode.path,
    };
  }, [seedPhrase]);

  const createWalletFromSeed = useCallback(() => {
    if (!seedPhrase) {
      console.error('Seed phrase is not set');
      return;
    }

    // Check if wallet already exists for the current index (length of wallets)
    const existingWallet = wallets.find(wallet => wallet.index === wallets.length);
    
    if (!existingWallet) {
      const walletWithId = createWalletWithIndex(wallets.length);
      if (walletWithId) {
        setSelectedWallet(walletWithId);
        setWallets(prevWallets => [...prevWallets, walletWithId]); // Add the new wallet
        setSelectedWalletIndex(wallets.length);
      }
    } else {
      // If the wallet already exists, simply set it as selected
      setSelectedWallet(existingWallet);
      setSelectedWalletIndex(existingWallet.index);
    }
    
  }, [seedPhrase, wallets, createWalletWithIndex]);

  const restoreWalletFromSeed = useCallback(async (index, phrase) => {
    if (!phrase || index === undefined) {
      console.error('Invalid seed phrase or index');
      return;
    }
    
    // Check if wallet exists at the provided index
    const existingWallet = wallets.find(wallet => wallet.index === index);
    if (existingWallet) {
      setSelectedWallet(existingWallet);
      setSelectedWalletIndex(existingWallet.index);
    } else {
      try {
        // Restore the wallet using ethers.js with the correct derivation path
        const hdNode = ethers.HDNodeWallet.fromPhrase(phrase, `m/44'/60'/0'/0/${index}`);
  
        const walletWithId = {
          id: wallets.length + 1,  // Adjust ID handling if necessary
          index,                   // Associate the wallet with the provided index
          address: hdNode.address,  // Use the restored address
          privateKey: hdNode.privateKey,
          publicKey: hdNode.publicKey,
          mnemonic: phrase,         // Store the mnemonic in the wallet object
        };
  
        // Update wallet state and selected wallet
        setWallets(prevWallets => [...prevWallets, walletWithId]);
        setSelectedWallet(walletWithId);
        setSelectedWalletIndex(index);
  
      } catch (error) {
        console.error('Error restoring wallet:', error.message);
      }
    }
  }, [wallets]);
  

  // Optional: Use useEffect to perform any logic after a wallet is selected or updated
  useEffect(() => {
    if (selectedWallet) {
      console.log('Wallet restored and selected:', selectedWallet);
      // Perform any side-effects like navigation after restoring the wallet
    }
  }, [selectedWallet]);  // Triggers when selectedWallet is updated
  
  return (
    <WalletContext.Provider
      value={{
        selectedWalletIndex,
        selectedWallet,
        wallets,
        setWallets,
        seedPhrase,
        setSeedPhrase,
        setSelectedWalletIndex,
        setSelectedWallet,
        createWalletFromSeed,
        restoreWalletFromSeed,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

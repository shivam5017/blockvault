import React, { createContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';

// Create the context
export const WalletContext = createContext();

// Create the provider component
export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState([]);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState({});
 
  // Helper function to create an HD node with a specific index
  const createWalletWithIndex = useCallback((index) => {
    if (!seedPhrase) {
      console.error('Seed phrase is not set');
      return null; // or throw an error
    }
    console.log(seedPhrase)
    const hdNode = ethers.HDNodeWallet.fromPhrase(seedPhrase, `m/44'/60'/0'/0/${index}`);
    return {
      id: index, // Use index as the ID for easy retrieval
      index: index, // Store the index for restoring later
      address: hdNode.address,
      privateKey: hdNode.privateKey,
      publicKey: hdNode.publicKey,
      signingKey: hdNode.signingKey,
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

  const restoreWalletFromSeed = useCallback((index) => {
    if (!seedPhrase || index === undefined) {
      console.error('Invalid seed phrase or index');
      return;
    }

    // Check if wallet exists at the provided index
    const existingWallet = wallets.find(wallet => wallet.index === index);
    if (existingWallet) {
      setSelectedWallet(existingWallet);
      setSelectedWalletIndex(existingWallet.index);
    } else {
      // If wallet does not exist, create a new one with the specified index
      const walletWithId = createWalletWithIndex(index);
      if (walletWithId) {
        setSelectedWallet(walletWithId);
        setWallets(prevWallets => [...prevWallets, walletWithId]); // Add the new wallet if it's not already in the list
        setSelectedWalletIndex(index);
      }
    }
    
  }, [seedPhrase, createWalletWithIndex, wallets]);

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

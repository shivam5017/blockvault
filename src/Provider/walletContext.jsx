import React, { createContext, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

// Create the context
export const WalletContext = createContext();

// Helper function to generate a unique storage key for each seed phrase
const getStorageKeyForSeed = (seedPhrase) => {
  return `wallets-${seedPhrase.slice(0, 5)}`; // Using the first 5 characters of the seed phrase for key uniqueness
};

// Create the provider component
export const WalletProvider = ({ children }) => {
  const [wallets, setWallets] = useState([]);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Helper function to save wallets to localStorage
  const saveWalletsToLocalStorage = (wallets, seedPhrase) => {
    const storageKey = getStorageKeyForSeed(seedPhrase);
    localStorage.setItem(storageKey, JSON.stringify(wallets));
  };

  // Helper function to load wallets from localStorage for a specific seed phrase
  const loadWalletsFromLocalStorage = (seedPhrase) => {
    const storageKey = getStorageKeyForSeed(seedPhrase);
    const savedWallets = localStorage.getItem(storageKey);
    return savedWallets ? JSON.parse(savedWallets) : [];
  };

  // Load wallets from localStorage on seed phrase change
  useEffect(() => {
    if (seedPhrase) {
      const storedWallets = loadWalletsFromLocalStorage(seedPhrase);
      setWallets(storedWallets);
    }
  }, [seedPhrase]);

  // Helper function to create an HD node with a specific index
  const createWalletWithIndex = useCallback(
    (index) => {
      if (!seedPhrase) {
        console.error('Seed phrase is not set');
        return null;
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
    },
    [seedPhrase]
  );

  // Create a wallet from the current seed phrase and add it to the current wallet list
  const createWalletFromSeed = useCallback(() => {
    if (!seedPhrase) {
      console.error('Seed phrase is not set');
      return;
    }

    // Check if wallet already exists for the current index (length of wallets)
    const existingWallet = wallets.find((wallet) => wallet.index === wallets.length);

    if (!existingWallet) {
      const walletWithId = createWalletWithIndex(wallets.length);
      if (walletWithId) {
        setSelectedWallet(walletWithId);
        const updatedWallets = [...wallets, walletWithId];
        setWallets(updatedWallets); // Add the new wallet
        saveWalletsToLocalStorage(updatedWallets, seedPhrase); // Persist to localStorage
        setSelectedWalletIndex(wallets.length);
      }
    } else {
      // If the wallet already exists, simply set it as selected
      setSelectedWallet(existingWallet);
      setSelectedWalletIndex(existingWallet.index);
    }
  }, [seedPhrase, wallets, createWalletWithIndex]);

  const restoreWalletFromSeed = useCallback(
    async (index, phrase) => {
      if (!phrase || index === undefined) {
        console.error('Invalid seed phrase or index');
        return;
      }

      // Set the current seed phrase to the provided one
      setSeedPhrase(phrase);

      // Load wallets for this seed phrase
      const walletsForSeed = loadWalletsFromLocalStorage(phrase);

      // Check if wallet exists at the provided index
      const existingWallet = walletsForSeed.find((wallet) => wallet.index === index);
      if (existingWallet) {
        setSelectedWallet(existingWallet);
        setSelectedWalletIndex(existingWallet.index);
      } else {
        try {
          // Restore the wallet using ethers.js with the correct derivation path
          const hdNode = ethers.HDNodeWallet.fromPhrase(phrase, `m/44'/60'/0'/0/${index}`);

          const walletWithId = {
            id: walletsForSeed.length + 1,
            index,
            address: hdNode.address,
            privateKey: hdNode.privateKey,
            publicKey: hdNode.publicKey,
            mnemonic: phrase,
          };

          // Update wallet state and selected wallet
          const updatedWallets = [...walletsForSeed, walletWithId];
          setWallets(updatedWallets);
          setSelectedWallet(walletWithId);
          setSelectedWalletIndex(index);
          saveWalletsToLocalStorage(updatedWallets, phrase); // Persist to localStorage
        } catch (error) {
          console.error('Error restoring wallet:', error.message);
        }
      }
    },
    [wallets]
  );

  // Optional: Use useEffect to perform any logic after a wallet is selected or updated
  useEffect(() => {
    if (selectedWallet) {
      console.log('Wallet restored and selected:', selectedWallet);
      // Perform any side-effects like navigation after restoring the wallet
    }
  }, [selectedWallet]);

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

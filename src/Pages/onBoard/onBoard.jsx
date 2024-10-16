import React, { useState, useCallback, useMemo,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import {
  Create_Wallet,
  Login_Wallet,
  Heading,
  ERROR_MESSAGE_TXT,
  Sub_Heading,
  OnBoard_Container,
  Copy_To_CLIP_BTN,
  Button_Container,
  Sub_Heading_B,
  Wallet_INFO_DIV,
  MENOMIC_CONTAINER,
  MENOMIC_WORD,
  ALERT_DIV,
  ALERT_TEXT,
  CONTINUE_BTN,
  MODAL,
  CONTENT_CONTAINER_2,
  CONTENT_CONTAINER,
  MODAL_CONTENT,
  CLOSE_MODAL,
  VERIFICATION_CONTAINER,
  OPTIONS_CONTAINER,
  VERIFICATION_OPTIONS,
  ERROR_MESSAGE_1
} from "../styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { WalletContext } from '../../Provider/walletContext';


const OnBoard = () => {
  const { setSeedPhrase,setWallets,seedPhrase,wallets,setSelectedWalletIndex,setSelectedWallet,createWalletFromSeed } = useContext(WalletContext);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Copy to Clipboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationOptions, setVerificationOptions] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [verificationError, setVerificationError] = useState("");
 
  const copyToClipboard = useCallback(() => {
    if (seedPhrase) {
      navigator.clipboard.writeText(seedPhrase).then(() => {
        setButtonText("Copied!");
        setTimeout(() => setButtonText("Copy to Clipboard"), 3000);
      }).catch(err => console.error("Could not copy text: ", err));
    }
  }, [seedPhrase]);

  const generateSeedPhrase = useCallback(() => {
    const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16));
    setSeedPhrase(mnemonic);
  }, []);

 

  const confirmation = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setVerificationStep(false);
  };

  const verification = useCallback(() => {
    setIsModalOpen(false);
    setVerificationStep(true);
    const words = seedPhrase.split(' ');
    const correctIndex = 0; // Modify this logic for random selection if needed
    const correctWord = words[correctIndex];
    const randomWords = words.filter((_, i) => i !== correctIndex).slice(0, 3);
    const options = [...randomWords, correctWord].sort(() => 0.5 - Math.random());
    setVerificationOptions(options);
    setCorrectWord(correctWord);
  }, [seedPhrase]);

  const handleVerification = useCallback((selectedWord) => {
    if (selectedWord === correctWord) {
      setVerificationError('');
      setVerificationStep(false);
      createWalletFromSeed();
      navigate('/dashboard');
    } else {
      setVerificationError('Incorrect word selected. Please try again.');
    }
  }, [correctWord, createWalletFromSeed]);

  const mnemonicWords = useMemo(() => seedPhrase.split(" "), [seedPhrase]);

  return (
    <>
      {!verificationStep ? (
        <>
          {seedPhrase ? (
            <Wallet_INFO_DIV>
              <Heading>SECRET PHRASE</Heading>
              <Sub_Heading_B>
                The phrase is a very important combination of words that will help you recover your wallet if you're logged out or lose your device.
              </Sub_Heading_B>
              <Button_Container>
                <Copy_To_CLIP_BTN onClick={copyToClipboard}>
                  <ContentCopyIcon fontSize="sm" /> {buttonText}
                </Copy_To_CLIP_BTN>
              </Button_Container>
              <MENOMIC_CONTAINER>
                {mnemonicWords.map((word, index) => (
                  <MENOMIC_WORD key={index}>{word}</MENOMIC_WORD>
                ))}
              </MENOMIC_CONTAINER>
              <ALERT_DIV>
                <ALERT_TEXT>
                  If you lose your seed phrase, you won't be able to recover your wallet! Write it down and keep it in a safe place.
                </ALERT_TEXT>
              </ALERT_DIV>
              <CONTINUE_BTN onClick={confirmation}>CONTINUE</CONTINUE_BTN>
            </Wallet_INFO_DIV>
          ) : (
            <OnBoard_Container>
              <Heading>Block Vault</Heading>
              <Sub_Heading>
                The Smart Way to Store, Send, and Secure Your Crypto
              </Sub_Heading>
              <Button_Container>
                <Create_Wallet onClick={generateSeedPhrase}>CREATE WALLET</Create_Wallet>
              </Button_Container>
              <Button_Container>
                <Login_Wallet onClick={() => navigate("/login")}>LOG IN</Login_Wallet>
              </Button_Container>
            </OnBoard_Container>
          )}

          {isModalOpen && (
            <MODAL>
              <CLOSE_MODAL onClick={closeModal}>X</CLOSE_MODAL>
              <CONTENT_CONTAINER>
                <MODAL_CONTENT>SAVED SECRET PHRASE?</MODAL_CONTENT>
              </CONTENT_CONTAINER>
              <CONTENT_CONTAINER_2>
                <MODAL_CONTENT>
                  If you lose your seed phrase, you won't be able to recover your wallet! Write it down and keep it in a safe place.
                </MODAL_CONTENT>
              </CONTENT_CONTAINER_2>
              <CONTENT_CONTAINER_2>
                <CLOSE_MODAL onClick={verification}>Yes, Saved</CLOSE_MODAL>
              </CONTENT_CONTAINER_2>
            </MODAL>
          )}
        </>
      ) : (
        <VERIFICATION_CONTAINER>
          <Heading>Verification</Heading>
          <Sub_Heading>Select the 1st correct word from your mnemonic phrase:</Sub_Heading>
          <OPTIONS_CONTAINER>
            {verificationOptions.map((option, index) => (
              <VERIFICATION_OPTIONS key={index} onClick={() => handleVerification(option)}>
                {option}
              </VERIFICATION_OPTIONS>
            ))}
          </OPTIONS_CONTAINER>
          {verificationError && (
            <ERROR_MESSAGE_1>
              <ERROR_MESSAGE_TXT>{verificationError}</ERROR_MESSAGE_TXT>
            </ERROR_MESSAGE_1>
          )}
        </VERIFICATION_CONTAINER>
      )}
    </>
  );
};

export default OnBoard;

import React,{useContext} from 'react'
import { WalletContext } from '../../Provider/walletContext';
import WalletDiv from '../../Components/WalletDiv/walletDiv';
import {
  Add_ACCOUNT_BTN,
  Button_Container
  
} from "../styled";

//enroll certain under demand build garbage wet buffalo fame awake drift wedding
//0x715 1st
//0x109
const Dashboard = () => {
    
    const {seedPhrase,wallets,selectedWalletIndex,selectedWallet,createWalletFromSeed,setSelectedWalletIndex,setSelectedWallet } = useContext(WalletContext);
 
    const handleChange = (e) => {
      const selectedIndex = parseInt(e.target.value, 10);
      const selectedWallet = wallets[selectedIndex];
      setSelectedWallet(selectedWallet);
      setSelectedWalletIndex(selectedIndex);
    };
    console.log('sed',seedPhrase)

  return (
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',background:'#333'}}>
         {wallets.length > 0 && (
            <WalletDiv wallets={wallets} selectedWalletIndex={selectedWalletIndex} selectedWallet={selectedWallet} handleChange={handleChange} />
          )}
          { wallets.length > 0 && (
            <div>
              <Button_Container className='margin-top-15'>
                <Add_ACCOUNT_BTN onClick={createWalletFromSeed} className='buttons'>
                  {wallets.length ? `Add Account` : 'Create a Wallet'}
                </Add_ACCOUNT_BTN>
              </Button_Container>
            </div>
          )}
    </div>
  )
}

export default Dashboard
import React from 'react';
import { Label, Select, AccountBox, AccountContainer, Address, Address_Text } from '../../Pages/styled';

const minifyAddress = (address, middleChars = 6, endChars = 4) => {
    if (!address) return "";
    if (address.length < 20) return address;
    if (address.substr(-4) === ".eth") return address;
    return `${address.substring(0, middleChars + 2)}...${address.substring(
        address.length - endChars
    )}`;
};

const WalletDiv = ({ wallets, selectedWalletIndex, handleChange }) => {
  return (
    <AccountContainer>
      <AccountBox>
        {wallets.length > 0 && (
          <>
            <Label>
              <Select
                id="input-select"
                value={selectedWalletIndex !== null ? selectedWalletIndex : 0} // Default to 0 if null
                onChange={handleChange}
              >
                {wallets.map((wallet, index) => (
                  <option value={index} key={index}>
                    Wallet {index + 1}
                  </option>
                ))}
                
              </Select>
            </Label>

            <Address>
              <Address_Text>
                {minifyAddress(wallets[selectedWalletIndex]?.address)} {/* Optional chaining */}
              </Address_Text>
            </Address>

            {/* Uncomment this once you implement wallet balance */}
            {/* <EthAmount>
              <h2>{walletBalance} ETH</h2>
            </EthAmount> */}
          </>
        )}
      </AccountBox>
    </AccountContainer>
  );
};

export default WalletDiv;

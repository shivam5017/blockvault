import React, { useContext, useState, useEffect, useRef } from "react";
import { WalletContext } from "../../Provider/walletContext";
import WalletDiv from "../../Components/WalletDiv/walletDiv";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Add_ACCOUNT_BTN, Button_Container, Label, Select } from "../styled";

const Dashboard = () => {
  const {
    seedPhrase,
    wallets,
    selectedWalletIndex,
    selectedWallet,
    createWalletFromSeed,
    setSelectedWalletIndex,
    setSelectedWallet,
  } = useContext(WalletContext);

  const [openSettings, setOpenSettings] = useState(false);
  const modalRef = useRef(null); // Create a ref for the modal content

  const handleChange = (e) => {
    const selectedIndex = parseInt(e.target.value, 10);
    const selectedWallet = wallets[selectedIndex];
    setSelectedWallet(selectedWallet);
    setSelectedWalletIndex(selectedIndex);
  };

  // Close modal if clicked outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenSettings(false); // Close modal when clicking outside
    }
  };

  useEffect(() => {
    if (openSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSettings]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "#333",
      }}
    >
      {/* Label and Select dropdown for Bnb Chain */}
      <Label>
        <Select id="input-select">Bnb Chain</Select>
      </Label>

      {/* Wallet Selection */}
      {wallets.length > 0 && (
        <WalletDiv
          wallets={wallets}
          selectedWalletIndex={selectedWalletIndex}
          selectedWallet={selectedWallet}
          handleChange={handleChange}
        />
      )}

      {/* More Vert Icon for Settings */}
      {wallets.length > 0 && (
        <button
          style={{
            background: "transparent",
            borderRadius: "10px",
            marginRight: -60,
          }}
          onClick={() => setOpenSettings(!openSettings)}
        >
          <MoreVertIcon style={{ color: "white" }} />
        </button>
      )}

      {/* Modal for Adding More Wallets */}
      <div style={{ overflow: "hidden" }}>
        <div style={openSettings ? modalOpenStyles : modalClosedStyles}>
          <div style={modalContentStyles} ref={modalRef}>
            <h4 style={{ color: "white" }}>Add More Wallets</h4>
            {wallets.length > 0 && (
              <div>
                <Button_Container>
                  <Add_ACCOUNT_BTN onClick={createWalletFromSeed}>
                    {wallets.length ? `Add Account` : "Create a Wallet"}
                  </Add_ACCOUNT_BTN>
                </Button_Container>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal opening styles with slide-in animation
const modalOpenStyles = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "250px",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  transition: "transform 0.3s ease-in-out",
  transform: "translateX(0)", // Fully visible
};

// Modal closing styles with slide-out animation
const modalClosedStyles = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "250px",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  transition: "transform 0.3s ease-in-out",
  transform: "translateX(100%)", // Hidden off-screen to the right
};

// Modal content styling
const modalContentStyles = {
  padding: "20px", // Padding for spacing inside modal
  borderRadius: "10px", // Rounded corners
  textAlign: "center",
  width: "200px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Shadow for some depth
};

export default Dashboard;

import styled from "styled-components";

const palette = {
  colors: {
    primary: "#333",
    secondary: "white",
    third: "#666 ",
    alert:"#ffaa43"
  },
  font: {
    extra_sm: "10px",
    sm: "16px",
    sm_B: "20px",
    md: "24px",
    lg: "30px",
    extralg: "36px",
  },
  font_family: {
    fontFamily: "Playfair Display",
  },
};

/////////////////////////////////////////////////////////////////////////////
// Create_Wallet_Button Style
const Create_Wallet = styled.button`
  background-color: ${palette.colors.primary};
  color: ${palette.colors.secondary};
  width: 80%;
  border: none;
  border-right: 3px solid ${palette.colors.secondary};
  border-bottom: 3px solid ${palette.colors.secondary};
  border-radius: 5px;
  padding: 10px 20px;
  font-size: ${palette.font.sm};
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${palette.font_family.fontFamily};
  font-weight: bolder;
`;

// Login_Wallet_Button Style
const Login_Wallet = styled.button`
  background-color: ${palette.colors.primary};
  color: ${palette.colors.secondary};
  width: 80%;
  border: none;
  border-right: 3px solid ${palette.colors.secondary};
  border-bottom: 3px solid ${palette.colors.secondary};
  border-radius: 5px;
  padding: 10px 20px;
  font-size: ${palette.font.sm};
  font-weight: bolder;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${palette.font_family.fontFamily};
`;

const Heading = styled.h1`
  font-size: ${palette.font.extralg};
  margin: 0 0;
  text-align: center;
  color: ${palette.colors.primary};
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-family: ${palette.font_family.fontFamily};
`;

const Sub_Heading = styled.h4`
  font-size: ${palette.font.sm};
  margin: 10px 0;
  text-align: center;
  color: ${palette.colors.third};
  font-weight: bolder;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-family: ${palette.font_family.fontFamily};
`;

const OnBoard_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${palette.colors.secondary};
  height: 100vh;
  font-family: ${palette.font_family.fontFamily};
`;

const Button_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Sub_Heading_B = styled.h4`
  font-size: ${palette.font.extra_sm};
  margin: 10px 0;
  text-align: center;
  color: ${palette.colors.third};
  font-weight: bolder;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-family: ${palette.font_family.fontFamily};
`;

const Copy_To_CLIP_BTN = styled.button`
  background-color: ${palette.colors.primary};
  color: ${palette.colors.secondary};
  width: 80%;
  border: none;
  border-right: 3px solid ${palette.colors.secondary};
  border-bottom: 3px solid ${palette.colors.secondary};
  border-radius: 5px;
  padding: 10px 20px;
  font-size: ${palette.font.extra_sm};
  font-weight: bolder;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${palette.font_family.fontFamily};
`;

//Main Div

const Wallet_INFO_DIV = styled.div`
  text-align: center; /* Center align text for better presentation */
`;

const MENOMIC_CONTAINER = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

const MENOMIC_WORD = styled.div`
  background-color: ${palette.colors.primary}; /* Light grey background for each word */
  font-family: ${palette.font_family.fontFamily};
  border-radius: 4px; /* Slightly rounded corners */
  padding: 10px; /* Padding for better spacing */
  margin: 5px; /* Margin between words */
  font-weight: bold; /* Bold font for emphasis */
  flex: 1 1 30%; /* Allow each word to take up 30% of the container width */
  text-align: center; /* Center align the text in each box */
  min-width: 40px; /* Minimum width for uniformity */
  max-width: 60px; /* Set a maximum width to prevent overflow */
  color: ${palette.colors.secondary};
`;

const ALERT_DIV = styled.div`
  background-color: ${palette.colors.alert};
  margin: 10px;
  border-radius: 10px;
`;

const ALERT_TEXT = styled.p`
  font-size: ${palette.font.extra_sm};
  padding: 10px;
  font-family: ${palette.font_family.fontFamily};
`;

const CONTINUE_BTN = styled.button`
  background-color: ${palette.colors.primary};
  color: ${palette.colors.secondary};
  width: 80%;
  border: none;
  border-right: 3px solid ${palette.colors.secondary};
  border-bottom: 3px solid ${palette.colors.secondary};
  border-radius: 5px;
  padding: 10px 20px;
  font-size: ${palette.font.extra_sm};
  font-weight: bolder;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${palette.font_family.fontFamily};
`;

const MODAL = styled.div`
  position: fixed; /* Fixed position for the modal */
  bottom: 0; /* Align to the bottom */
  left: 0; /* Align to the left */
  right: 0; /* Align to the right */
  height: 50%; /* Occupy half of the screen height */
  background-color: rgba(
    0,
    0,
    0,
    0.9
  ); /* Black background with slight transparency */
  z-index: 1000; /* Ensure it is on top */
  animation: slideIn 0.5s; /* Animation for sliding in */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const CONTENT_CONTAINER = styled.div`
  display: flex;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const CONTENT_CONTAINER_2 = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const MODAL_CONTENT = styled.p`
  font-size: ${palette.font.extra_sm};
  font-family: ${palette.font_family.fontFamily};
  color: ${palette.colors.secondary};
`;

const CLOSE_MODAL = styled.button`
  margin: 10px; /* Space above the button */
  background-color: ${palette.colors.primary}; /* Button background color */
  color: ${palette.colors.secondary}; /* Button text color */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px 15px; /* Padding for the button */
  cursor: pointer; /* Pointer cursor on hover */
  align-self: flex-end;
  font-family: ${palette.font_family.fontFamily};
`;

const VERIFICATION_CONTAINER = styled.div`
  padding: 20px;
  text-align: center;
`;

const OPTIONS_CONTAINER = styled.div`
  gap: 10px;
  display: grid;
  grid-template-columns: 2, 1fr;
`;
const VERIFICATION_OPTIONS = styled.div`
  background: ${palette.colors.primary};
  color: ${palette.colors.secondary};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-family: ${palette.font_family.fontFamily};
`;

const ERROR_MESSAGE_1 = styled.div`
  margin-top: 20px;
  color: red;
  font-weight: bold;
`;

const ERROR_MESSAGE_TXT = styled.p`
 font-size: ${palette.font.sm};
  margin: 10px 0;
  text-align: center;
  color: ${palette.colors.alert};
  font-weight: bolder;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-family: ${palette.font_family.fontFamily};
`

const LOGIN_HEADING_CONTAINER = styled.div`
 height: 25vh;
    text-align: center;
    color: ${palette.colors.primary}; /* Cyan color for headings */
    padding: 20px; /* Add padding for spacing */
`

const LOGIN_MAIN_SEED_CONTAINER = styled.div`
   width: 100%; /* Full width */
    max-width: 600px; /* Set a max width */
    height: 55vh; /* Fixed height to enable scrolling */
    overflow-y: auto; /* Enable vertical scrolling */
    padding: 10px; /* Padding inside the container */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
    border-radius: 20px;
    background-color: transparent; /* Darker background for the seed container */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
`

const LOGIN_SEED_HEADING_CONTAINER = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 20px;
`

const LOGIN_SEED_BLOCK= styled.input`
  width: 90%;
    height: 40px; /* Increased height for better usability */
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #ccc; /* Light border */
    padding: 10px;
    background-color: ${palette.colors.primary}; /* White background for blocks */
    color: ${palette.colors.secondary}; /* Dark text for visibility */
    transition: background-color 0.3s, transform 0.2s; /* Smooth transitions */
    font-family: ${palette.font_family.fontFamily};
`

const LOGIN_BUTTON_CONTAINER= styled.div`
  display: flex; /* Flex container for buttons */
    justify-content: center; /* Center buttons */
    margin-top: 20px; 
`
const LOGIN_BUTTON =styled.button`
  background-color: ${palette.colors.secondary};
  color: ${palette.colors.primary};
  width: 100%;
  border: none;
  border-right: 3px solid ${palette.colors.secondary};
  border-bottom: 3px solid ${palette.colors.secondary};
  border-radius: 5px;
  padding: 10px 20px;
  font-size: ${palette.font.extra_sm};
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${palette.font_family.fontFamily};
  font-weight: bolder;

`

// Dashboard

const AccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  border:'1px solid red';
  padding: 10px;
`;

const AccountBox = styled.div`
  background-color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
`;

const Select = styled.select`
  padding: 10px;
  font-size: ${palette.font.extra_sm};
  border-radius: 5px;
  background-color: ${palette.colors.third};
  width: 100%;
  max-width: 300px;
  font-family: ${palette.font_family};
  color: ${palette.colors.secondary};
`;

const Address = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
`;

const Address_Text = styled.p`
font-size: ${palette.font.extra_sm};
  margin: 10px 0;
  text-align: center;
  color: ${palette.colors.secondary};
  font-weight: bolder;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  font-family: ${palette.font_family.fontFamily};

`

const NoWallets = styled.p`
  text-align: center;
  color: #666;
  font-size: 18px;
`;

const Add_ACCOUNT_BTN= styled.button`
background-color: ${palette.colors.primary};
  color: ${palette.colors.secondary};
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: ${palette.font.extra_sm};
  border-right: 1.5px solid ${palette.colors.secondary};
  border-bottom: 1.5px solid ${palette.colors.secondary};
  font-weight: bolder;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${palette.font_family.fontFamily};
`


export {
  Create_Wallet,
  Login_Wallet,
  Heading,
  Sub_Heading,
  OnBoard_Container,
  Button_Container,
  Sub_Heading_B,
  Wallet_INFO_DIV,
  Copy_To_CLIP_BTN,
  MENOMIC_CONTAINER,
  MENOMIC_WORD,
  ALERT_DIV,
  ALERT_TEXT,
  CONTINUE_BTN,
  MODAL,
  CONTENT_CONTAINER,
  CONTENT_CONTAINER_2,
  MODAL_CONTENT,
  CLOSE_MODAL,
  VERIFICATION_CONTAINER,
  OPTIONS_CONTAINER,
  VERIFICATION_OPTIONS,
  ERROR_MESSAGE_1,
  ERROR_MESSAGE_TXT,
  LOGIN_HEADING_CONTAINER,
  LOGIN_MAIN_SEED_CONTAINER,
  LOGIN_SEED_HEADING_CONTAINER,
  LOGIN_SEED_BLOCK,
  LOGIN_BUTTON_CONTAINER,
  LOGIN_BUTTON,
  AccountContainer,
  AccountBox,
  Address,
  NoWallets,
  Label,
  Address_Text,
  Select,
  Add_ACCOUNT_BTN
};

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import bgImage from './Images/bg.jpg'; // This will still be fetched eventually
import OnBoard from './Pages/onBoard/onBoard';
import Login from './Pages/loginWallet/login';
import Dashboard from './Pages/dashboard/dashboard';
import { WalletProvider } from './Provider/walletContext';
import Navbar from "./Components/Navbar/navbar"
import { useLocation } from 'react-router-dom';





const BackgroundWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: ${({ isLoaded }) =>
    isLoaded
      ? `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 50%,
          rgba(0, 0, 5, 5) 100%
        ), url(${bgImage})`
      : 'url("data:image/jpeg;base64,...")'}; 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: background 0.5s ease-in-out;
`;

function Layout() {
  const location = useLocation(); 

  const hiddenNavbarRoutes = ['/','/dashboard']; 
  const shouldHideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  return (
    <div>
        {!shouldHideNavbar && <Navbar />}
      {/* Layout */}
      <div className="content">
        <Outlet /> {/* This renders the current route's component */}
      </div>
      {/* Footer */}
    </div>
  );
}

function App() {
  const [bgLoaded, setBgLoaded] = useState(false);

 

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <WalletProvider>
    <Router>
      <BackgroundWrapper isLoaded={bgLoaded}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<OnBoard  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BackgroundWrapper>
    </Router>
    </WalletProvider>
  );
}

export default App;

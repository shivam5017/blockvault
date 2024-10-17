import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const backToOnboard=()=>{
         navigate('/')
    }

  return (
    <div style={{ background: "#333" }}>
      <button style={{background:"none",border:"none"}} onClick={backToOnboard}>
        <ArrowBackIosNewIcon style={{ padding: "5px", color: "white" }} />
      </button>
    </div>
  );
};

export default Navbar;

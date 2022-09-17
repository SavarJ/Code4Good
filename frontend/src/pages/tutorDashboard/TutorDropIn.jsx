import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";

// import AddIcon from '@mui/icons-material/Add';

function DropIn() {
  // this will be the entire drop in menu component
  // default state is clocked out
  const [available, setAvailable] = useState(false);
  function clockIn() {
    const email = window.localStorage.getItem('useremail');
    // send a database request to user profile
    axios.post('/clockin', {'email': email}) 
    setAvailable(true);
  }
  function clockOut() {
    const email = window.localStorage.getItem('useremail');
    // send a database request to user profile
    axios.post('/clockout', {'email': email}) 
    setAvailable(false);
  }
  return (
    <>
      {/* if clocked in, display clock out menu */}
      {available && <Button onClick={() => clockOut()} color="error" variant="contained">Clock out</Button> }
      {/* if clocked out, display clock in menu */}
      {!available && <Button onClick={() => clockIn()} color="success" variant="contained">Clock In</Button> }
    </>
  );
}

export default DropIn;

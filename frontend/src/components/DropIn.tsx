import React, { useState } from "react";
import Button from "@mui/material/Button";
// import AddIcon from '@mui/icons-material/Add';

function DropIn() {
  // this will be the entire drop in menu component
  // default state is clocked out
  const [available, setAvailable] = useState(false);
  function clockIn() {
    // send a database request to user profile 
    setAvailable(true);
  }
  function clockOut() {
    // send a database request to user profile 
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

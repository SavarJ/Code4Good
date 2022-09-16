import React, { useState } from "react";
import Button from "@mui/material/Button";
// import AddIcon from '@mui/icons-material/Add';

function DropIn() {
  // this will be the entire drop in menu component
  const [available, setAvailable] = useState(true);
  function clockIn() {
    // send a database request to user profile 
  }
  return (
    <>
      {available && <Button>test</Button> }

    </>
  );
}

export default DropIn;

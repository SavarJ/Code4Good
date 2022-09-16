import React, { useState } from "react";
import Button from "@mui/material/Button";
// import AddIcon from '@mui/icons-material/Add';

function DropIn() {
  const [available, setAvailable] = useState(false);
  return (
    <>
      {available} && <Button>test</Button>

    </>
  );
}

export default DropIn;

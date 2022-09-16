import React, {useState} from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function DropIn() {
  const [available, setAvailable] = useState(false);
  return (
    <>
      {available} && <Fab color="primary" aria-label="add">
  <AddIcon />
</Fab>

    </>
  )
}

export default DropIn;
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import "./tutordropin.css";

import axios from "axios";

function DropIn({}) {
  // this will be the entire drop in menu component
  // default state is clocked out
  const [available, setAvailable] = useState(false);
  function clockIn() {
    const email = window.localStorage.getItem("useremail");
    // send a database request to user profile
    console.log("clocking in");
    fetch("http://localhost:5050/clockin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAvailable(true);
      });
    setAvailable(true);
  }
  function clockOut() {
    const email = window.localStorage.getItem("useremail");
    // send a database request to user profile
    axios.post("http://localhost:5050/clockout", { email: email });
    setAvailable(false);
  }
  return (
    <Box sx={{ width: "35%" }}>
      <SportsFootballIcon sx={{ fontSize: "250%" }} className="footballIcon" />
      <Box
        sx={{
          border: 1,
          borderColor: "#12dcb6",
          backgroundColor: "#EDF3F2",
          borderRadius: 10,
          padding: 3,
        }}
      >
        <ClockButton
          available={available}
          clockIn={clockIn}
          clockOut={clockOut}
        />
      </Box>
    </Box>
  );
}

function ClockButton({ available, clockOut, clockIn }) {
  if (available) {
    /* if clocked in, display clock out menu */
    return (
      <>
        <Alert sx={{ m: 2 }} severity="success">
          {" "}
          You are available! Please wait for a student to drop in!{" "}
        </Alert>
        <Button
          fullWidth
          onClick={() => clockOut()}
          color="error"
          variant="contained"
        >
          Clock out
        </Button>
      </>
    );
  } else {
    /* if clocked out, display clock in menu */
    return (
      <>
        <Button
          fullWidth
          onClick={() => clockIn()}
          color="success"
          variant="contained"
        >
          Clock In
        </Button>
      </>
    );
  }
}

export default DropIn;

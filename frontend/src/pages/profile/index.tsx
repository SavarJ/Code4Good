import { ThemeProvider } from "@emotion/react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  createTheme,
  SelectChangeEvent,
  TextareaAutosize,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import userEvent from "@testing-library/user-event";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const theme = createTheme();
  const [hearAboutUs, setHearAboutUs] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setHearAboutUs(event.target.value as string);
  };

  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const user = {
    role: "Student",
  };
  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /*Axios.post("/users",({
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      dateOfBirth: data.get('dateOfBirth'),
      phoneNumber: data.get('phoneNumber'),
      role : 'student'

    }));*/
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      dateOfBirth: data.get("dateOfBirth"),
      phoneNumber: data.get("phoneNumber"),
      role: "student",
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  disabled
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                {/* Date of Birth */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled
                  name="phoneNumber"
                  label="Phone Number"
                  type="phonenumber"
                  id="phonenumber"
                  autoComplete="phone-number"
                />
              </Grid>
              {user.role === "Student" ? (
                <>
                  <Grid item xs={12}>
                    <FormControl required>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Math Grade
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="A"
                          control={<Radio />}
                          label="A"
                        />
                        <FormControlLabel
                          value="B"
                          control={<Radio />}
                          label="B"
                        />
                        <FormControlLabel
                          value="C"
                          control={<Radio />}
                          label="C"
                        />
                        <FormControlLabel
                          value="D"
                          control={<Radio />}
                          label="D"
                        />
                        <FormControlLabel
                          value="F"
                          control={<Radio />}
                          label="F"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl required>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        English Grade
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="A"
                          control={<Radio />}
                          label="A"
                        />
                        <FormControlLabel
                          value="B"
                          control={<Radio />}
                          label="B"
                        />
                        <FormControlLabel
                          value="C"
                          control={<Radio />}
                          label="C"
                        />
                        <FormControlLabel
                          value="D"
                          control={<Radio />}
                          label="D"
                        />
                        <FormControlLabel
                          value="F"
                          control={<Radio />}
                          label="F"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl required>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Science Grade
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="A"
                          control={<Radio />}
                          label="A"
                        />
                        <FormControlLabel
                          value="B"
                          control={<Radio />}
                          label="B"
                        />
                        <FormControlLabel
                          value="C"
                          control={<Radio />}
                          label="C"
                        />
                        <FormControlLabel
                          value="D"
                          control={<Radio />}
                          label="D"
                        />
                        <FormControlLabel
                          value="F"
                          control={<Radio />}
                          label="F"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl required>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        History Grade
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="A"
                          control={<Radio />}
                          label="A"
                        />
                        <FormControlLabel
                          value="B"
                          control={<Radio />}
                          label="B"
                        />
                        <FormControlLabel
                          value="C"
                          control={<Radio />}
                          label="C"
                        />
                        <FormControlLabel
                          value="D"
                          control={<Radio />}
                          label="D"
                        />
                        <FormControlLabel
                          value="F"
                          control={<Radio />}
                          label="F"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <TextField
                    autoComplete="education"
                    name="education"
                    required
                    fullWidth
                    id="education"
                    label="Education"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  autoComplete="why-jdream"
                  name="why"
                  required
                  fullWidth
                  id="why"
                  label="Why JDream?"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    How did you hear about us?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hearAboutUs}
                    label="Hear About Us"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Referral"}>Referral</MenuItem>
                    <MenuItem value={"Alumni"}>Alumni</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;

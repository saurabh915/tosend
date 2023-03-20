import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ReactPhoneInput from 'react-phone-input-2'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css"
import OTPInput from "otp-input-react";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
const theme = createTheme();

const App = () => {
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  let navigate = useNavigate();

  const  getOtp = async() => {
    let input = phone;
    // let output = input.replace(/[-\s]/g, '');
    let output = input.split(" ").join("");
    setPhone(input);
    output = output.replace('-','')
    const user = {
      verificationId:output,
      countryCode:"IN"
    }
    console.log(output)
    if (phone.length === 0) {
      alert("Please enter phone number to proceed");
    }
    else {
      try {
        const resp = await axios.post('https://api.qriteeq.com/v1/auth/register',user);
        console.log(resp);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
      setShowOTP(true);
    }
  }
  const loginUser = async () => {
    if (OTP.length == 0) {
      alert("Please enter OTP to proceed");
    }
    else if (OTP.length < 4) {
      alert("Please enter valid OTP");
    }
    else {
      try {
        const tokenotp ={
          verificationId:phone,
          otp:OTP
      }
      console.log(OTP)
        const resp = await axios.post('https://api.qriteeq.com/v1/auth/verify-otp',tokenotp);
        console.log(resp.data.message);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
      navigate("/feedback");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            minHeight: '400px',
            marginTop: 10,
            display: 'flex',
            padding: '20px',
            boxShadow: '0 0px 10px 0 rgba(0,0,0,0.2)',
            borderRadius: '5px',
            width: '100%',
            border: '2px solid black',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <img src='/assets/appIconBG.png' style={{ height: '40px' }}></img>
          <Typography component="h1" variant="h5" style={{ marginTop: '20px' }}>
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <ReactPhoneInput
              inputExtraProps={{
                name: "phone",
                required: true,
                autoFocus: true
              }}
              defaultCountry={"in"}
              value={phone}
              onChange={setPhone}
            />
            {
              showOTP ? <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", marginTop: '30px' }}>
                <OTPInput type="phone" value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
              </div> : ("")
            }
            {
              showOTP ? ("") : <Button
                //type="submit"
                style={{ marginTop: '40px', padding: '5px', fontWeight: 'bold' }}
                fullWidth
                onClick={getOtp}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                GET OTP
              </Button>
            }
            {
              showOTP ? <div style={{ display: "flex", marginTop: '40px' }}>
                <Button
                  //type="submit"
                  style={{ padding: '5px', fontWeight: 'bold', margin: "5px" }}
                  fullWidth
                  // onClick={getOtp}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Resend OTP
                </Button>
                <Button
                  //type="submit"
                  style={{ padding: '5px', fontWeight: 'bold', margin: "5px" }}
                  fullWidth
                  onClick={loginUser}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
              </div> : ("")
            }

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
export default App
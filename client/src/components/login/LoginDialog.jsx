import React, { useState, useEffect, useContext } from 'react';
import { Box, Dialog, TextField, Button, Typography, styled } from "@mui/material";
import { DataContext } from '../../context/DataProvider';
import { authenticateLogin, authenticateSignup } from '../../service/api';

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
`;

const Image = styled(Box)`
  background: #20b2aa url(tr.webp) center 85% no-repeat;
  height: 83%;
  width: 40%;
  padding: 45px 35px;
  & > h5, & > p {
    color: #FFF;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  & > div, & > button, & > p {
    margin-top: 20px;
    font-weight: 600;
  }
`;

const LoginButton = styled(Button)`
  background: #20b2aa;
  color: #FFF;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  background: #fff;
  color: #20b2aa;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const CreateAccount = styled(Typography)`
  margin: auto 0 5px 0;
  text-align: center;
  color: #20b2aa;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const accountInitialValues = {
  login: {
    View: 'login',
    heading: 'Login',
    subHeading: 'Join as a client or freelancer'
  },
  signup: {
    View: 'signup',
    heading: "Looks like you're new here",
    subHeading: 'Signup to get started'
  }
};

const signupInitialValues = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: ''
};

const loginInitialValues = {
  username: '',
  password: ''
};

const LoginDialog = ({ open, setOpen }) => {
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login,] = useState(loginInitialValues);
  const [, setError] = useState(false);
  const [signupErrors, setSignupErrors] = useState({}); 

  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    setSignupErrors({}); 
  }, [account]);

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password' || name === 'confirmPassword') {
      // If the field is password or confirmPassword, update both state variables.
      setSignup({ ...signup, [name]: value });
    } else {
      // Otherwise, update the field as usual.
      setSignup({ ...signup, [name]: value });
    }
  };

  const validateSignup = () => {
    const errors = {};
    if (!signup.firstname) {
      errors.firstname = "First name is required";
    }
    if (!signup.lastname) {
      errors.lastname = "Last name is required";
    }
    if (!signup.username) {
      errors.username = "Username is required";
    }
    if (!signup.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(signup.email)) {
      errors.email = "Invalid email format";
    }
    if (!signup.password) {
      errors.password = "Password is required";
    } else if (signup.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/\d/.test(signup.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(signup.password)) {
      errors.password = "Password must contain at least one special character";
    }
    if (!signup.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (signup.confirmPassword !== signup.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!signup.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(signup.phone)) {
      errors.phone = "Invalid phone number";
    }
    setSignupErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const signupUser = async () => {
    if (validateSignup()) {
      let response = await authenticateSignup(signup);
      if (!response) return;
      handleClose();
      setAccount(signup.username);
    }
  };

  const validateLogin = () => {
    const errors = {};
    if (!login.username) {
      errors.username = "Email/mobile number is required";
    }
    if (!login.password) {
      errors.password = "Password is required";
    }
    setSignupErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const loginUser = async () => {
    if (validateLogin()) {
      let response = await authenticateLogin(login);
      console.log(response);
      if (response.status === 200) {
        handleClose();
        setAccount(response.data.data.firstname);
      } else {
        setError(true);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
      <Component>
        <Box style={{ display: 'flex', height: '100%' }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
          </Image>
          {account.View === 'login' ? (
            <Wrapper>
              <TextField type="text" variant="standard" onChange={onInputChange} name='username' label="Enter Email/mobile number" />
              {signupErrors.username && <Error>{signupErrors.username}</Error>}
              <TextField type="password" variant="standard" onChange={onInputChange} name='password' label="Enter password" />
              {signupErrors.password && <Error>{signupErrors.password}</Error>}
              <Text>By continuing, you agree to our's Terms of Use and Privacy Policy.</Text>
              <LoginButton onClick={loginUser}>Login</LoginButton>
              <Typography style={{textAlign:'center'}}>OR</Typography>
              <RequestOTP>Reset OTP</RequestOTP>
              <CreateAccount onClick={toggleSignup}>New to GenZquest? Create an account</CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField type="text" variant="standard" onChange={onInputChange} name='firstname' label='Enter Firstname' />
              {signupErrors.firstname && <Error>{signupErrors.firstname}</Error>}
              <TextField type="text" variant="standard" onChange={onInputChange} name='lastname' label='Enter Lastname' />
              {signupErrors.lastname && <Error>{signupErrors.lastname}</Error>}
              <TextField type="text" variant="standard" onChange={onInputChange} name='username' label='Enter Username' />
              {signupErrors.username && <Error>{signupErrors.username}</Error>}
              <TextField type="email" variant="standard" onChange={onInputChange} name='email' label='Enter Email' />
              {signupErrors.email && <Error>{signupErrors.email}</Error>}
              <TextField type="password" variant="standard" onChange={onInputChange} name='password' label='Enter Password' />
              {signupErrors.password && <Error>{signupErrors.password}</Error>}
              <TextField type="password" variant="standard" onChange={onInputChange} name='confirmPassword' label='Confirm Password' />
              {signupErrors.confirmPassword && <Error>{signupErrors.confirmPassword}</Error>}
              <TextField type="text" variant="standard" onChange={onInputChange} name='phone' label='Enter Phone' />
              {signupErrors.phone && <Error>{signupErrors.phone}</Error>}
              <LoginButton onClick={signupUser}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
}

export default LoginDialog;
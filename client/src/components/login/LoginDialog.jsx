import React, { useContext, useState } from 'react';
import { authenticateSignup } from '../../service/api';
import {
  Box,
  Dialog,
  TextField,
  Button,
  Typography,
  styled
} from '@mui/material';
import DataContext from "../../context/DataProvider";


const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
`;

const Image=styled(Box)`
background:#20b2aa url(tr.webp)center 85% no-repeat;
height:83%;
width:40%;
padding : 45px 35px;
 & > h5,& > p{
    color:#FFF;
}

`
const Wrapper=styled(Box)`
display:flex;
flex-direction:column;
padding : 25px 35px;
flex:1;
& > div, & > button,& > p{
    margin-Top:20px;
    font-weight: 600;
}
`;

const LoginButton=styled(Button)`
background:#20b2aa ;
color:#FFF;
height:48px;
border-radius:2px;
`;

const RequestOTP=styled(Button)`
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
    cursor: pointer
`
const accountInitialValues = {
    login :{
        View:'login',
        heading: 'Login',
        subHeading:'Join as a client or freelancer'
    },

    signup:{
        View:'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};
const LoginDialog = ({ open, setOpen }) => {
    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const { setAccount } = useContext(DataContext);
  
    const handleClose = () => {
      setOpen(false);
      toggleAccount(accountInitialValues.login);
    };
  
    const toggleSignup = () => {
      toggleAccount(accountInitialValues.signup);
    };
  
    const onInputChange = (e) => {
      setSignup({ ...signup, [e.target.name]: e.target.value });
    };
  
    const signupUser = async () => {
      let response = await authenticateSignup(signup);
      if (!response) return;
      handleClose();
      setAccount(signup.firstname);
    };
return(
        <Dialog open={open} onClose={handleClose} PaperProps={{sx:{maxWidth:'unset'}}}>
            <Component>
            <Box style={{display:'flex', height:'100%'}}>  

                <Image>
                    <Typography variant="h5">{account.heading}</Typography>
                    <Typography style={{marginTop:20}}>{account.subHeading}</Typography>
                </Image>

                {  account.View ==='login' ?
                <Wrapper>

             <TextField variant="standard" label="Enter Email/mobile number"/>
             <TextField variant="standard" label="Enter password"/>
             <Text>By continuing, you agree to our's Terms of Use and Privacy Policy.</Text>
             <LoginButton>Login</LoginButton>
             <Typography style={{textAlign:'center'}}>OR</Typography>
             <RequestOTP>Reset OTP</RequestOTP>
             <CreateAccount onClick={() => toggleSignup()}>New to Magna? Create an account</CreateAccount>
             
             </Wrapper>

             :

             <Wrapper>

                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
    
                    <LoginButton onClick={() => signupUser()} >Continue</LoginButton>
            </Wrapper>
}



</Box>      
            </Component>
            </Dialog>
    )
}
export default LoginDialog;
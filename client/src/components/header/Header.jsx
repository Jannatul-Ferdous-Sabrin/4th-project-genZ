
import { AppBar, Toolbar, styled } from '@mui/material';
import Box from '@mui/material/Box';

const StyledHeader = styled(AppBar)({
  background: '#2874f0',
  height: '70px',
});

const Component = styled(Box)({
    marginLeft: '12%',
  });
  
const Header = () => {
const logoURL = 'https://i.ibb.co/fv5ZZQd/profile.png';
  return (
    <StyledHeader>
      <Toolbar>
        <Component>
          <img src={logoURL} alt="logo" style={{width:'250px' }} />
          <Box>

          </Box>
        </Component>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;


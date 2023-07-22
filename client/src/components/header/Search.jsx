import { InputBase,Box, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled(Box)`
background:#fff;
width: 8%;
border-radius:2px;
margin-left:20px;
display:flex;
`;
const InputSearchBase = styled(InputBase)`
padding-left:2px;
width:100%;
`;
const SearchIconWrappper = styled(Box)`
color:#20b2aa;
padding:5px;
font-size:unset;`

const Search = ()=>{

    return(
        <SearchContainer>
            <InputSearchBase  placeholder="search" 
            />
            <SearchIconWrappper>
                <SearchIcon/>
            </SearchIconWrappper>
        </SearchContainer>

    )
}
export default Search;
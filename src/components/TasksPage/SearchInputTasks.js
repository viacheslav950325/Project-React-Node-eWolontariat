import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { Box, Divider, Typography, ListItemText } from '@material-ui/core';
import CustomAvatar from '../../theme/CustomAvatar';
import { ListItemButton } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';
import { makeStyles} from '@mui/styles';
import { useSelector } from "react-redux";
import { selectAllTasks } from '../../store/taskSlice';
import CustomTypography from '../../theme/CustomTypography';
import setCategoryIcon from '../../theme/setCategoryIcon';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginBottom: '0.6rem',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    border: '1px solid #DFDCDC',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
  }));

  const useStyles = makeStyles({
    spanColor:{
      fontWeight: 600,
      letterSpacing: '1px',
      background: 'linear-gradient(104deg,#82ffad00 .9%,#82ffad 2.4%,#82ffad80 5.8%,#82ffad1a 93%,#82ffadb3 96%,#82ffff00 98%),linear-gradient(183deg,#82ffad00,#82ffad4d 7.9%,#82ffad00 15%)',
    }
 }) 

  const SearchInputTasks = () => {
    const tasksList = useSelector(selectAllTasks);
    const [value, setValue] = useState('');
    const [filteredResults, setFilteredResults] = useState();
    const [displaySearchIcon, setdisplaySearchIcon] = useState(true);
      
      function  findMatches(wordToMatch) {
        return( tasksList.tasks?.filter((task)=>{
          const regex = new RegExp(wordToMatch,"gi");
          return task.title.toLowerCase().match(regex) || task.action_short_description.toLowerCase().match(regex)
        }));
      };

      function displayMatches({value,data}) {
        if (value && value.length > 1) {
          setdisplaySearchIcon('none');
          const matchArray = findMatches(value,data);
          setFilteredResults(matchArray);
        } else {
          setdisplaySearchIcon('flex');
          setFilteredResults([]);
        }
        return displaySearchIcon;
      };
      
    const classes = useStyles();

      return (
        <StyledEngineProvider injectFirst>
          <Search>
            <SearchIconWrapper>
                <SearchIcon color='primary' 
                style={{display: `${displaySearchIcon}`}}
                />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Znajdź zadanie dla wolontariusza…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e)=>{
                  setValue(e.target.value);
                  displayMatches({value,tasksList});
                }}
                onKeyUp={(e)=>{
                  setValue(e.target.value);
                  displayMatches({value,tasksList});
                }}
                value={value}
                >
            </StyledInputBase>
            {filteredResults?.map((el,id)=>{
              const regex = new RegExp(value,'gi'); 
              return (
                    <Box key={`item-${id}`} style={{ border: "1px #eee solid"}} width = {"800px"} >
                      <ListItemButton key={`listitembutton-${id}`}  display={"flex"} style={{width: "100%"}} disableGutters>
                          <CustomAvatar 
                            variant={"avatarBackground"} 
                            backgroundcolor={setCategoryIcon(el.categories[0])[1]}
                            style={{margin: "0.8rem"}}
                            key={`item-${id}`} 
                            >
                              {setCategoryIcon(el.categories[0])[0]}
                            </CustomAvatar>
                            <Divider key={`divideritem-${id}`}  orientation="vertical" flexItem/>
                              <ListItemText className={"searchList"} key={`listitem-${id}`} 
                                style={{marginLeft: "1rem", fontSize: "0.8rem", fontWeight: "600"}}
                                primary= 
                                          {el.title.replace(regex, `<span>${value}<span>`).split('<span>').map((item,id)=>{
                          
                                              if (item.match(regex)) return (
                                                <CustomTypography component="span" variantcolor= 'spanColor' className={classes.spanColor} key={`spancolortititem-${id}`}>{item}</CustomTypography>
                                              )
                                              else return (
                                                <Typography variantcolor= 'spanwithoutColor' key={`typotititem-${id}`} component="span">{item}</Typography>
                                              )
                                          })}
                                
                                secondary=
                                          {el.action_short_description.replace(regex, `<span>${value}<span>`).split('<span>').map((item,id)=>{
                                            
                                            if (item.match(regex)) return (
                                              <CustomTypography variant="subtitle2" variantcolor= 'spanColor' component="span" className={classes.spanColor} key={`spancolordesc-${id}`}>{item}</CustomTypography>
                                            )
                                            else return (
                                              <Typography variant="subtitle2" variantcolor= 'spanwithoutColor' key={`typodesc-${id}`} component="span" >{item}</Typography>
                                            )
                                        })}
                              >
                              </ListItemText>
                  </ListItemButton>
                </Box>
                )
            })}
        </Search>
      </StyledEngineProvider>
      ) 
   
  }

  export default SearchInputTasks;

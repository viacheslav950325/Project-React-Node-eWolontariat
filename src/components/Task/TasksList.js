import { Box, CircularProgress, Typography, Divider } from "@material-ui/core";
import { useEffect, useState  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortTasks,  selectAllTasks } from "../../store/taskSlice";
import CustomButton from "../../theme/CustomButton";
import { fetchTasks } from "../../store/fetchTasks";
import getTasksCards from "./getTasksCards";
import SearchInputTasks from "../TasksPage/SearchInputTasks";
import ChooseCat from "../ChooseCat";
import setTasksRatingButtons from "../TasksPage/setTasksRatingButtons";

const TasksList = ({startSlice,endSlice}) => {
  const dispatch = useDispatch();
  const tasksList = useSelector(selectAllTasks);
  const tasksStatus = useSelector(state => state.task.status);
  const error = useSelector(state => state.task.error);
  const [filteredTasks, setTasks] = useState([]);
  const [isFilterTasks, setFilterTasks] = useState(false);

  let orderedTasks =[];

  useEffect(() => {
    if (tasksStatus === 'idle') {
      dispatch(fetchTasks())
    }
  }, [tasksStatus, dispatch]);

  let content, searchInput;

  if (tasksStatus === 'loading...') {
       content = (
        <Box style={{color: 'red'}} padding={2} align={"center"}>
            <CircularProgress style={{margin: "2rem"}} align={"center"} color={"secondary"}/>
        </Box>
      );
  } else if (tasksStatus === 'succeeded (:') {
      orderedTasks = dispatch(sortTasks(tasksList.tasks)).payload;
      searchInput = <SearchInputTasks/>;
      
  } else if (tasksStatus === 'failed :(') {
       content = <Box style={{color: 'red'}} padding={2} align={"center"}>ERROR: {error}</Box>;
  }  
  
  function getFilteredTextFromButton(text) {
    return (
        tasksList.tasks?.filter(element => 
              element.categories.includes(text))
          )
    };

    let thePopularCategoriesButtons = setTasksRatingButtons(orderedTasks).slice(0,4);

    return (
      <Box>
        <Box display={"flex"} justifyContent={"center"} style={{margin: "4rem 0 1rem"}}>
              {searchInput}
        </Box>
        <Box id="filtering-buttons" display={"flex"} justifyContent={'center'}  gridColumnGap={"2rem"} padding={"2rem 0"} margin={"1rem"} alignItems={"center"} flexWrap={"wrap"}>
                    <Typography variant="subtitle2" align={"left"} style={{marginTop: "1rem"}}>Najpopularniejsze <br/>kategorie:</Typography> 
                    <CustomButton 
                        variant="outlined" 
                        style={{marginTop: "1rem"}}
                        color={"primary"}  
                        onClick={()=>{
                          setFilterTasks(false);
                        }}        
                    >
                    Wszystkie</CustomButton>
                {thePopularCategoriesButtons.map((category,id)=>(
                    <CustomButton 
                        key={`item-${id}`} 
                        id= {category.value}
                        variant="contained" 
                        style={{marginTop: "1rem"}}
                        color={category.buttonColor}
                        startIcon={category.icon}
                        onClick={()=>{
                            setTasks(getFilteredTextFromButton(category.value));
                            setFilterTasks(true);
                        }}                           
                    >
                        <Divider orientation="vertical" flexItem style={{backgroundColor: "#eee", marginRight:"10px"}} /> {category.value}
                    </CustomButton>
                    
                ))}
            </Box>
            <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} flexWrap={"wrap"}>
              <ChooseCat/>
            </Box>
              {content}
              <Box display={'flex'} flexDirection={"row"} flexWrap={"wrap"} padding={'0 4rem 4rem 4rem'} justifyContent={'center'}>
                  {getTasksCards(isFilterTasks, orderedTasks, filteredTasks, startSlice, endSlice)}
              </Box>
         </Box>
    )
}

export default TasksList;

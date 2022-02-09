import { Button, Typography, Box, TextField, Card, Divider } from "@material-ui/core";
import ProgressBar from "./ProgressBar";
import liscik from "../../assets/img/plane.svg";
import skrzynka from "../../assets/img/mailbox.svg";
import avatar from "../../assets/img/facet.png";
import CustomButton from "../../theme/CustomButton";
import { useSelector } from "react-redux";
import { selectAllTasks, selectTasksId} from '../../store/taskSlice';
import { useParams } from 'react-router-dom'
import setCategoryIcon from "../../theme/setCategoryIcon";

const TaskPage = () => {
    const { taskId } = useParams();
    let id = parseInt({ taskId }.taskId);
    const tasksList = useSelector(selectAllTasks).tasks;
    const task = selectTasksId(tasksList, id);

    return (
        <Box id={"task-page"}
        display={"flex:"}
        height = {"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"2rem"}
    >
        <Box sx={{display:"grid",gridTemplateColumns: {xl:"(3fr, 1fr)", xs:"1fr"}, gap: 2, justifyItems: 'center', alignItems: 'space-evenly', gridTemplateRows: 'auto',
          gridTemplateAreas: `"header header "
        "main sidebar"
        "main mailbox"
        "footer footer"`}}>
        <Box style={{ gridArea: 'header'}}>
            <Typography variant="h1" align="center"> {task.title}</Typography>
        </Box>
      
        <Box style={{gridArea:'sidebar' , display:"flex", flexDirection:"column", alignItems: 'center', justifyContent: 'space-around', maxHeight:'50rem'}}>
            <Box>
                <Button variant="contained" color="primary" size="large" href="/TasksPage">Zobacz wszystkie zadania </Button>
            </Box>
            <Card  style={{ margin:'0,8rem', padding: '2.0rem',  display:'flex',  flexDirection:'column', justifyContent:'space-between', alignItems: 'center'}}>
            <Box >
                <Typography variant="h3" align="center">Ilu wolontariuszy potrzebujemy?</Typography>
                <Typography variant="body1" align={'center'}>{task.amount}</Typography>
                <Typography variant="body1" align={'center'}>Ilu się zapisało: {task.sign}</Typography>
                <ProgressBar const completed= {Math.floor(task.sign/task.amount*100)}/>
                <Box style={{display:"flex", flexDirection:"column", alignItems: 'center', justifyContent: 'space-around', height:"100px"}} >
                    <CustomButton variant="outlined" color="primary" size="large" >Udostępnij</CustomButton>
                    <Button  variant="contained" color="secondary" size="large" > Pomagam </Button>
                </Box>
                </Box>
                </Card>

                <Card raised={true} style={{ padding: '0.8rem 2.4rem', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems: 'center'}}>
            <Box >
                <Typography margin="10px" variant="h5" align="center">Zgłoszeni wolontariusze</Typography>
                <Button  mb="10px" variant="outlined" size="medium" align="center">Kasia z Gdańska</Button>
            </Box>
            </Card>
            </Box>
            <Box sx={{ gridArea:'mailbox', marginTop:"10px", alignSelf:"end"}}>
                <Box>
                    <img width="200px" src={skrzynka} alt=""/>
                </Box>
            </Box>
      
        <Box sx={{ gridArea: 'main', alignItems:"center", width:'90%', justifyContent:"center"}}>
            <Box>
            <Typography variant={"subtitle1"}>Kategorie: </Typography>
            <CustomButton 
                        variant="contained" 
                        style={{marginTop: "1rem"}}
                        color={setCategoryIcon(task.categories[0])[1]}
                        startIcon={setCategoryIcon(task.categories[0])[0]}                        
            >
              <Divider orientation="vertical" flexItem style={{backgroundColor: "#eee", marginRight:"10px"}} /> {task.categories[0]}
            </CustomButton>
            </Box>
            <Box 
                    align={"center"}
                    component={'img'}
                    padding={"2rem"}
                    src={require(`../../assets/img/tasks/${task.image}.jpg`)}
                    alt={`${task.title}`}
                    style = {{maxWidth:"550px"}}
                />
            <Typography variant="body1">{task.action_description}</Typography>  
            <img width="300px" height="200px" src={liscik} alt=""/>

            <Card raised={true} style={{ margin:'1rem', padding: '0.5rem 0.1rem', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems: 'center'}}>
            <Box sx={{gridArea:"main"}}  mx='0.5rem'  >
                <Typography variant="h3" align="center" >Komentarze</Typography>  
                <Typography  variant="body2"  ><img height="45px" src={avatar} alt=""/>{task.comments}</Typography>
                </Box>
                </Card>

                <Card raised={true} style={{ margin:'1rem', padding: '0.8rem 0.5rem', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems: 'center'}}>
                <TextField label="Napisz komentarz" multiline rows={2} fullWidth/>
                </Card>
        </Box>
        </Box>
     
    </Box>








    )
}

export default TaskPage;
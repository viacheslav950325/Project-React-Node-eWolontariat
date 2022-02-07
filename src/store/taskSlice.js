import { createSlice } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit';
import { fetchTasks } from "./fetchTasks";

const initialState = {
    tasks: [],
    status: 'idle',
    error: null
  };

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        sortTasks: (state,action) => {
            state.tasks.sort(compareDate);
            return state;
        },
        addNewTask: (state, action) => {
         state.tasks.push(action.payload);
         console.log(current(state));
         console.log(current(state.tasks).length);
         
        },
        selectTask:(state, action) => {
            return action.payload;
        },
        filterTasks: (state, action) => {
            return action.payload;
        },
        searchTasks: (state,action) => {
            return action.payload;
        }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchTasks.pending, (state, action) => {
            state.status = 'loading...'
          })
          .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = 'succeeded (:'
            state.tasks = action.payload;
          })
          .addCase(fetchTasks.rejected, (state, action) => {
            state.status = 'failed :('
            state.error = action.error.message
          })
      }
});

export const { sortTasks, addNewTask, selectTask, filterTasks } = taskSlice.actions;

export default taskSlice.reducer;

export const selectAllTasks = state => state;

export const selectTasksId = (state, taskId) =>
  state.tasks.find(task => task.id === taskId);


function compareDate( a, b ) {
    if ( a.date > b.date  ){
      return -1;
    }
    if ( a.date < b.date ){
      return 1;
    }
    return 0;
}  


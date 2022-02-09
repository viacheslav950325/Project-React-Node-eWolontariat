import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from "./ApiTasks";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await Api.getData();
    const json = await response.json();
    return json;
  });

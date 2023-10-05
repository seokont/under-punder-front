import { configureStore } from '@reduxjs/toolkit';
import authReduce from 'reduce/authReduce';
import projectReduce from 'reduce/projectReduce';
import taskReduce from 'reduce/taskReduce';
import userReduce from 'reduce/userReduce';

const store = configureStore({
  reducer: {
    auth:authReduce,
    project: projectReduce,
    task: taskReduce,
    user: userReduce
  },
});

export default store;
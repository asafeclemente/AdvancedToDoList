import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Card, CardContent, Typography } from '@mui/material';

export default function Home() {

  const { totalTasksRegistered, totalTasksInProgress, totalCompletedTasks, isLoading } = useTracker(() => {
    const noDataAvailable = { totalTasksRegistered: 0, totalTasksInProgress: 0, totalCompletedTasks: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('allTasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const totalTasksRegistered = TasksCollection.find({ status: 0 }).count()
    const totalTasksInProgress = TasksCollection.find({ status: 1 }).count();
    const totalCompletedTasks = TasksCollection.find({ status: 2 }).count();

    return { totalTasksRegistered, totalTasksInProgress, totalCompletedTasks };
  });


  const navigate = useNavigate();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={4}>
        <Card
          sx={{
            p: 1,
            height: 170,
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Tarefas Cadastradas:
            </Typography>
            <Typography variant="h4" component="div">
              {totalTasksRegistered}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Card
          sx={{
            p: 1,
            height: 170,
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Tarefas em andamento:
            </Typography>
            <Typography variant="h4" component="div">
              {totalTasksInProgress}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4} lg={4}>
        <Card
          sx={{
            p: 1,
            height: 170,
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Tarefas concluídas:
            </Typography>
            <Typography variant="h4" component="div">
              {totalCompletedTasks}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          onClick={() => navigate('/tasks')}
          onCu
          sx={{
            p: 2, display: 'flex',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            cursor: 'pointer', 
            transition: 'box-shadow 0.3s ease-in-out', 
            '&:hover': {
              boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
            },
            flexDirection: 'column'
          }}>
          Ver lista de tarefas
        </Card>
      </Grid>
    </Grid>

  )
}


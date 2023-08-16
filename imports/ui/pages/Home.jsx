import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
// TODO remove, this demo shouldn't need to reset the theme.


export default function Home() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          {/* <Chart /> */}
          Todas as tarefas cadastradas
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          {/* <Deposits /> */}
          Todas as tarefas a serem concluidas
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          {/* <Deposits /> */}
          Todas as tarefas concluidas
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper
          onClick={() => navigate('/tasks')}
          sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          {/* <Orders /> */}
          Tarefas
        </Paper>
      </Grid>
    </Grid>

  )
}


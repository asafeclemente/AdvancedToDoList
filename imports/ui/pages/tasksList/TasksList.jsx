import * as React from 'react';
import Box from '@mui/material/Box';
import AddTask from './components/AddTask';
import { useTracker } from 'meteor/react-meteor-data';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { TasksCollection } from '/imports/db/TasksCollection';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { parse, format } from 'date-fns';


export default function TasksList() {

  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = React.useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      // hideCompleted ? pendingOnlyFilter : userFilter,
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount };
  });

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        minHeight: 200,
      }}
    >
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <TaskAltIcon/>
            </ListItemIcon>
            <ListItemText
              primary={task.text}
              secondary={`Criado por: ${task.username}  (${format(task.createdAt, 'HH:mm - dd/MM/yyyy')})`}
            />
          </ListItem>
        ))}
      </List>
      <AddTask/>
    </Box>
  );
}
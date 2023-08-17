import * as React from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import AddTask from './components/AddTask';
import { useTracker } from 'meteor/react-meteor-data';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LongMenu from './components/LongMenu';

export default function TasksList() {
  const user = useTracker(() => Meteor.user());

  const [hoveredIndex, setHoveredIndex] = React.useState(null); // New state to track hovered item
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

    const tasks = TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount };
  });

  const handleItemHover = (index) => {
    setHoveredIndex(index);
  };

  const handleItemLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        minHeight: 200,
      }}
    >
      <List sx={{ pt: 0, pb: 0 }}>
        {tasks.map((task, index) => (
          <React.Fragment key={index}>
            <ListItem
              key={index}
              onMouseEnter={() => handleItemHover(index)}
              onMouseLeave={handleItemLeave}
              onClick={() => handleItemHover(index)} // Enable on mobile click
              sx={{
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <ListItemIcon>
                <TaskAltIcon />
              </ListItemIcon>
              <ListItemText
                primary={task.text + " " + task._id}
                secondary={`Criado por: ${task.username}  (${format(
                  task.createdAt,
                  'HH:mm - dd/MM/yyyy'
                )})`}
              />
              {/* Renderize o componente LongMenu condicionalmente */}
              {hoveredIndex === index && <LongMenu />}
            </ListItem>
            {index !== tasks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <AddTask />
    </Box>
  );
}

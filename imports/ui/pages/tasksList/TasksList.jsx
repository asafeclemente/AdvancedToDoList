import * as React from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import AddTask from './components/AddTask';
import LongMenu from './components/LongMenu';
import { useNavigate } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import { useTracker } from 'meteor/react-meteor-data';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const tabValues = { 0: "Cadastrada", 1: "Em andamento", 2: "Concluida" }


export default function TasksList() {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate()

  const [hoveredIndex, setHoveredIndex] = React.useState(null); // New state to track hovered item
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('allTasks');

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
    <>
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
                onClick={() => { task.userId === user._id && navigate('/tasks/' + task._id) }}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                <ListItemIcon>
                  {task.privateTask ? <AssignmentIcon /> : <PublicIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={task.name + " | " + tabValues[task.status]}
                  secondary={
                    (task.userId !== user._id ?
                      `Criado por: ${task.username} (${format(task.createdAt, 'HH:mm - dd/MM/yyyy')})`
                      :
                      `(${format(task.createdAt, 'HH:mm - dd/MM/yyyy')})`
                    )
                  }
                />
                {/* Renderize o componente LongMenu condicionalmente */}
                {task.userId === user._id && hoveredIndex === index && <LongMenu task={task} />}
              </ListItem>
              {index !== tasks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
      <AddTask />
    </>
  );
}

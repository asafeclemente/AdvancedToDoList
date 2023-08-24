import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useTracker } from 'meteor/react-meteor-data';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const options = [
  'Editar',
  'Remover',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({task}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleOption = (option) => {
    if (option === "Editar"){
      navigate('/tasks/' + task._id);
    }

    else if (option === "Remover"){
      deleteTask(task)
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOption(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useTracker } from 'meteor/react-meteor-data';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { Opacity } from '@mui/icons-material';
import ConfirmationModal from '../../../components/ConfirmationModal';

const options = [
  'Editar',
  'Remover',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ see, task }) {
  const navigate = useNavigate();

  const [openDeleteTaskModal, setOpenDeleteTaskModal] = React.useState(false);

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

  const handleOption = (event, option) => {
    event.stopPropagation();
    setAnchorEl(null);
    if (option === "Editar") {
      navigate('/tasks/' + task._id);
    }

    else if (option === "Remover") {
      setOpenDeleteTaskModal(true)
    }
  };

  return (
    <>
      <IconButton
        sx={see ? null : { opacity: 0, pointerEvents: 'none' }}
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
          <MenuItem key={option} onClick={(event) => handleOption(event, option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <ConfirmationModal
        open={openDeleteTaskModal}
        handleClose={(event) => {
          event.stopPropagation();
          setOpenDeleteTaskModal(false)
        }}
        handleConfirm={(event) =>{
          event.stopPropagation();
          deleteTask(task)
          setOpenDeleteTaskModal(false)
        }}
      ></ConfirmationModal >
    </>
  );
}
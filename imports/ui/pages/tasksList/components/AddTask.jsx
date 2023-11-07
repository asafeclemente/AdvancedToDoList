import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import PrivateToggle from './PrivateToggle';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AddTask() {

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(false);
  }

  const [taskName, setTaskName] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");
  const [taskError, setTaskError] = React.useState(false);

  const [privateTask, setPrivateTask] = React.useState(true);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTaskName('');
    setTaskDescription('');
    setPrivateTask(true)
    setOpen(false)};

  const handleSubmit = e => {
    e.preventDefault();

    if (!taskName) return;

    Meteor.call('tasks.insert', taskName, taskDescription, privateTask, function (error, result) {
      if (error) {
        alert("Erro");
      }
      // TODO result não retorna nada
    });
    handleClose()
    setLoading(false);

  };

  return (
    <>
      <Fab sx={fabStyle} onClick={handleOpen} aria-label={"Adicionar tarefa"} color={'primary'}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adicionar nova tarefa
            </Typography>
            <PrivateToggle
              checked={privateTask}
              onChange={(checked) => setPrivateTask(checked)}>
            </PrivateToggle>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              variant="standard"
              fullWidth
              id="taskName"
              autoComplete="off"
              error={taskError}
              value={taskName}
              label="Nome da tarefa"
              name="taskName"
              autoFocus
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              variant="standard"
              fullWidth
              autoComplete="off"
              id="taskDescription"
              multiline
              rows={4}
              error={taskError}
              value={taskDescription}
              label="Descrição da tarefa"
              name="taskDescription"
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
            />

            <LoadingButton
              disabled={taskName !== "" ? false : true}
              type="submit"
              color="secondary"
              fullWidth
              sx={{ mt: 1, mb: 0 }}
              onClick={handleClick}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Adicionar tarefa</span>
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
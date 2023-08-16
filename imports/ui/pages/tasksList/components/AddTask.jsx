import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Fab, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

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
  width: 600,
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
  const [taskError, setTaskError] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (!taskName) return;

    Meteor.call('tasks.insert', taskName, function (error, result) {
      if (error) {
        alert("Erro");
      } else {
        console.log(result)
      }
    });

    setTaskName('');
    setLoading(false);

  };

  return (
    <div>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar nova tarefa
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ela será visível a todos os usuários.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              variant="standard"
              fullWidth
              id="taskName"
              error={taskError}
              value={taskName}
              label="Nome da tarefa"
              name="taskName"
              autoComplete="taskName"
              autoFocus
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />
            {/* <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              color={"primary"}
            >
              {"Adicionar"}
            </Button> */}

            <LoadingButton
              disabled={taskName !== ""? false : true}
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
    </div>
  );
}
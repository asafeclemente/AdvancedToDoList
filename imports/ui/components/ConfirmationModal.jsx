import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Modal, Typography } from "@mui/material";

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

export default function ConfirmationModal({ open, handleClose, handleSubmit }) {

  const [loading, setLoading] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tem certeza?
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Button 
          variant="contained"
          fullWidth
            onClick={handleClose}>Cancelar</Button>
          <LoadingButton
            type="submit"
            color="secondary"
            fullWidth
            sx={{ mt: 1, mb: 0 }}
            // onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<LogoutIcon />}
            variant="contained"
          >
            <span>Sim</span>
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  )
}
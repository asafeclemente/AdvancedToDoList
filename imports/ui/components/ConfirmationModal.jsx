import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  maxWidth: 400,
  minWidth: 280,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4
};

export default function ConfirmationModal({ open, handleClose, handleConfirm }) {

  const [loading, setLoading] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClick={(event) => {event.stopPropagation()}}
    >
      <Box sx={style}>
        <Box >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tem certeza?
          </Typography>
        </Box>
        <Box  >
          <Box sx={{
            mt: 3,
            display: 'flex',
            gap: 2
          }}>
            <Button
              fullWidth
              onClick={handleClose}>Cancelar</Button>
            <LoadingButton
              type="submit"
              color="secondary"
              fullWidth
              onClick={handleConfirm}
              loading={loading}
              variant="contained"
            >
              <span>Sim</span>
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
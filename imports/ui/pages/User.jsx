import * as React from 'react';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';

export default function User() {

	const navigate = useNavigate();

	const isLoading = false

	const [isEditing, setIsEditing] = React.useState(false);
	// const [editedUser, setEditedUser] = React.useState({ ...task });
	const [editedUser, setEditedUser] = React.useState({});


	const onCancel = () => {
	};

	const handleEditClick = () => {
		// setEditedUser(task);
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		// setEditedUser(task);
		setIsEditing(false);
		onCancel();
	};

	const handleSaveClick = () => {
		// const updatedObj = { ...task, ...editedUser };
		onSave(updatedObj);
		setIsEditing(false);
	};

	const onSave = (updatedObj) => {
		Meteor.call('tasks.update', taskId, updatedObj['name'], updatedObj['description'], updatedObj['status']
		);
	};

	const handleInputChange = (field, value) => {
		setEditedUser((prevState) => ({ ...prevState, [field]: value }));
	};

	// File
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [loadingUploadPhoto, setLoadingUploadPhoto] = React.useState(false);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleUpload = () => {
		// Aqui você pode adicionar a lógica para enviar o arquivo para o servidor
		// Por exemplo, usando uma biblioteca de requisições HTTP como Axios.
		if (selectedFile) {
			// Substitua esta parte com a lógica de envio real
			console.log(selectedFile)
			console.log(`Enviando arquivo: ${selectedFile.name}`);
		}
	};

	return (

		!isLoading ?
			<>
				<Box
					sx={{
						bgcolor: 'background.paper',
						position: 'relative',
						minHeight: 200,
						padding: 2
					}}
				>
					<Typography id="user-data" variant="h6" ml={2}>
						Seu perfil:
					</Typography>
					<Grid container spacing={2}
						sx={{
							mt: 2,
							mb: 3,
						}}>
						<Grid item xs={12}>
							<TextField
								id="taskName" label="Usuário" name="taskName"
								autoComplete="off"
								disabled={!isEditing}
								value={editedUser.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="email" label="Email" name="email"
								autoComplete="off"
								disabled={!isEditing}
								value={editedUser.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								disabled
								// margin="normal"
								label="Data de nascimento"
								value={editedUser.createdAt}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="sexo" label="Sexo" name="sexo"
								autoComplete="off"
								disabled={!isEditing}
								value={editedUser.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="empresa" label="Empresa" name="empresa"
								autoComplete="off"
								disabled={!isEditing}
								value={editedUser.name}
								onChange={(e) => handleInputChange('empresa', e.target.value)}
							/>
						</Grid>
					</Grid>
					<Box sx={{ mb: 1, flexGrow: 1 }}>
						<Grid container spacing={2}>
							{isEditing ? (
								<>
									<Grid item xs={6}>
										<Button fullWidth
											variant="outlined"
											color="error"
											onClick={handleCancelClick}>Cancelar</Button>
									</Grid>
									<Grid item xs={6}>
										<Button fullWidth
											variant="outlined"
											color="success"
											// disabled={
											// 	editedUser.name === task.name &&
											// 	editedUser.description === task.description
											// }
											onClick={handleSaveClick}>Salvar</Button>
									</Grid>
								</>
							) : (
								<>
									<Grid item xs={6}>
										<Button fullWidth
											variant="outlined"
											onClick={() => navigate(-1)}>Voltar</Button>
									</Grid>
									<Grid item xs={6}>
										<Button fullWidth
											variant="outlined"

											onClick={handleEditClick}>Editar</Button>
									</Grid>
								</>
							)}

						</Grid>
					</Box>
				</Box>
				<Box
					sx={{
						bgcolor: 'background.paper',
						position: 'relative',
						minHeight: 200,
						padding: 2,
						mt: 2
					}}
				>

					<Typography id="profile-image" variant="h6" ml={2}>
						Foto de perfil:
					</Typography>
					<Box
						sx={{
							padding: 2,
							mt: 2
						}}
					>
						<input
							id="contained-button-file"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							hidden />
						<label htmlFor="contained-button-file">
							<Typography id="file-select" variant="body1" ml={2}>
								Selecione o arquivo
							</Typography>
							<IconButton color="primary" component="label">
								<input
									id="contained-button-file"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									hidden />
								<AttachFileIcon fontSize="medium" />
							</IconButton>
						</label>
					</Box>

					{selectedFile && (
						<Box>
							<Typography id="file-selected" variant="body1" mb={2}>
								Arquivo selecionado: {selectedFile.name}
							</Typography>
							<LoadingButton
								size="small"
								onClick={handleUpload}
								endIcon={<SendIcon />}
								loading={loadingUploadPhoto}
								loadingPosition="end"
								variant="contained"
							>
								<span>Send</span>
							</LoadingButton>
						</Box>
					)}
				</Box>
			</>

			:
			<>Carregando...</>
	);
}

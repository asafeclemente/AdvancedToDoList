import * as React from 'react';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Avatar, Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function User() {

	const navigate = useNavigate();
	const isLoading = false

	const [isEditing, setIsEditing] = React.useState(false);
	// const [editedUser, setEditedUser] = React.useState({ ...task });
	const [editedUser, setEditedUser] = React.useState({sexo: "Masculino"});


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

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};


	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		const base64 = await convertBase64(file);
		setSelectedFile({ file: file, base64: base64 });
	};

	const handleUpload = () => {
		// Aqui você pode adicionar a lógica para enviar o arquivo para o servidor
		// Por exemplo, usando uma biblioteca de requisições HTTP como Axios.
		if (selectedFile) {
			// Substitua esta parte com a lógica de envio real
			console.log(selectedFile)
			console.log(`Enviando arquivo: ${selectedFile}`);
		}
	};

	const handleCancelUpload = () => {
		setSelectedFile(null)
	}

	const fileInputRef = React.useRef(null);
	const handleButtonClick = () => {
		// Aciona o evento de clique do input file quando o botão é clicado
		fileInputRef.current.click();
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
								fullWidth
								id="taskName" label="Usuário" name="taskName"
								autoComplete="off"
								disabled={!isEditing}
								value={editedUser.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="email" label="Email" name="email"
								autoComplete="off"
								disabled={!isEditing}
								value={editedUser.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<DatePicker
								fullWidth
								disabled={!isEditing}
								// margin="normal"
								label="Data de nascimento"
								value={editedUser.createdAt}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Age</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={editedUser.sexo}
									label="Sexo"
									onChange={(e) => handleInputChange('sexo', e.target.value)}
								>
									<MenuItem value={"Masculino"}>Masculino</MenuItem>
									<MenuItem value={"Feminino"}>Feminino</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
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
						padding: 2,
						mt: 2
					}}
				>
					<Typography id="profile-image" variant="h6" ml={2}>
						Foto de perfil:
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							margin: '0 auto',
							padding: 2,
							mt: 1,
							mb: 1
						}}
					>
						<Button id="contained-button-file"
							onClick={handleButtonClick}
							variant="contained"
							endIcon={<AttachFileIcon fontSize="medium" />}>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								ref={fileInputRef}
								hidden />
							Selecionar arquivo
						</Button>
					</Box>

					{selectedFile && (
						<Box sx={styles.container}>
							<Typography variant="body1" mb={2}>
								Arquivo selecionado: {selectedFile?.file?.name}
							</Typography>
							<Avatar alt="Cindy Baker" src={selectedFile.base64} sx={styles.avatar} />
							<Box>
								<Button
									size="small"
									variant="outlined"
									sx={styles.cancelButton}
									onClick={handleCancelUpload}
								>
									Cancelar
								</Button>
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
						</Box>
					)}
				</Box>
			</>

			:
			<>Carregando...</>
	);
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		padding: '16px',
		border: '1px solid #ccc',
		borderRadius: '8px',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		maxWidth: '300px',
		margin: '0 auto',
	},
	avatar: {
		width: '100px',
		height: '100px',
		margin: '10px'
	},
	cancelButton: {
		mr: 2,
	}
};
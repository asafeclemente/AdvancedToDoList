import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Box, Button, Grid, TextField } from '@mui/material';
import StatusTabs from './components/StatusTabs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function TaskDetails() {

	const navigate = useNavigate();

	const { taskId } = useParams();

	const { task, isLoading } = useTracker(() => {
		const noDataAvailable = { task: [] };
		if (!Meteor.user()) {
			return noDataAvailable;
		}
		const handler = Meteor.subscribe('tasks');

		if (!handler.ready()) {
			return { ...noDataAvailable, isLoading: true };
		}

		const task = TasksCollection.find({ _id: taskId }).fetch()[0];

		return { task: task, isLoading: false };
	});

	React.useEffect(() => {
		if (task && Object.keys(editedTask).length === 0) {
			setEditedTask({ ...task });
			setTabValue(task.status)
		}
	}, [task?.name]);

	const [tabValue, setTabValue] = React.useState(task?.status);
	const [isEditing, setIsEditing] = React.useState(false);
	const [editedTask, setEditedTask] = React.useState({ ...task });

	const onCancel = () => {
	};
	console.log(task)

	const handleEditClick = () => {
		setEditedTask(task);
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setEditedTask(task);
		setIsEditing(false);
		onCancel();
	};

	const handleSaveClick = () => {
		const updatedObj = { ...task, ...editedTask };
		onSave(updatedObj);
		setIsEditing(false);
	};

	const onSave = (updatedObj) => {
		Meteor.call('tasks.update', taskId, updatedObj['name'], updatedObj['description'], updatedObj['status']
		);
	};

	const handleInputChange = (field, value) => {
		setEditedTask((prevState) => ({ ...prevState, [field]: value }));
	};


	const onSaveStatus = (newStatus) => {
		Meteor.call('tasks.updateStatus', taskId, newStatus
		);
	};

	const handleStatusChange = (newStatus) => {
		setTabValue(newStatus);
		handleInputChange('status', newStatus);
		onSaveStatus(newStatus)
	};

	return (

		!isLoading ?
			Object.keys(editedTask).length ?
				<Box
					sx={{
						bgcolor: 'background.paper',
						position: 'relative',
						minHeight: 200,
						padding: 2
					}}
				>
					<StatusTabs
						tab={tabValue}
						onChange={(value) => handleStatusChange(value)} />
					<Grid container spacing={2}
						sx={{
							mt: 3,
							mb: 3,
						}}>
						<Grid item xs={12} sm={6}>
							<TextField
								id="taskName"
								label="Nome da tarefa"
								name="taskName"
								disabled={!isEditing}
								value={editedTask.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								disabled
								margin="normal"
								label="Data"
								value={editedTask.createdAt}
							/>
						</Grid>
					</Grid>
					<TextField
						sx={{
							mb: 2,
						}}
						id="taskDescription"
						fullWidth
						label="Descrição"
						multiline
						rows={4}
						value={editedTask.description}
						onChange={(e) => handleInputChange('description', e.target.value)}
						disabled={!isEditing}
					/>
					<Box sx={{ mb: 1, flexGrow: 1 }}>
						<Grid container spacing={2}>
							{isEditing ? (
								<>
									<Grid item xs={6}>
										<Item><Button fullWidth
											onClick={handleCancelClick}>Cancelar</Button></Item>
									</Grid>
									<Grid item xs={6}>
										<Item><Button fullWidth
											disabled={
												editedTask.name === task.name &&
												editedTask.description === task.description
											}
											onClick={handleSaveClick}>Salvar</Button></Item>
									</Grid>
								</>
							) : (
								<>
									<Grid item xs={6}>
										<Item><Button fullWidth
											onClick={() => navigate(-1)}>Voltar</Button></Item>
									</Grid>
									<Grid item xs={6}>
										<Item><Button fullWidth
											onClick={handleEditClick}>Editar</Button></Item>
									</Grid>
								</>
							)}

						</Grid>
					</Box>

				</Box>
				: "Tarefa não encontrada"
			:
			<>Carregando...</>
	);
}

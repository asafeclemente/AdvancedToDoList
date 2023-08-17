import * as React from 'react';
import { format } from 'date-fns';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TaskAltIcon } from '@mui/icons-material';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import StatusTabs from './components/StatusTabs';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const tabValues = { 0: "Cadastrada", 1: "Em andamento", 2: "Concluida" }

export default function TaskDetails() {
	const { taskId } = useParams();

	const [tabValue, setTabValue] = React.useState(0);

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
		// setTabValue(foundKey)

		return { task: task };
	});

	const onSave = () => {
	};

	const onCancel = () => {
	};

	const [isEditing, setIsEditing] = React.useState(false);
	const [editedTask, setEditedTask] = React.useState({ ...task });

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setEditedTask({ ...task });
		setIsEditing(false);
		setTabValue(task.status)
		onCancel();
	};

	const handleSaveClick = () => {
		onSave(editedTask);
		setIsEditing(false);
	};

	const handleInputChange = (field, value) => {
		setEditedTask((prevState) => ({ ...prevState, [field]: value }));
	};

	const handleStatusChange = (newStatus) => {
		if (newStatus !== editedTask.status) {
			handleInputChange('status', newStatus);
		}
	};

	return (
		!isLoading ?
			<Box
				sx={{
					bgcolor: 'background.paper',
					position: 'relative',
					minHeight: 200,
					padding: 2
				}}
			>

				<TextField
					sx={{
						mb: 2,
					}}
					margin="normal"
					fullWidth
					id="taskName"
					label="Nome da tarefa"
					name="taskName"
					autoComplete="taskName"
					autoFocus
					disabled={!isEditing}
					defaultValue={task.name}
					onChange={(e) => handleInputChange('name', e.target.value)}
				/>
				<TextField
					sx={{
						mb: 2,
					}}
					id="taskDescription"
					fullWidth
					label="Descrição"
					defaultValue={task.description}
					onChange={(e) => handleInputChange('description', e.target.value)}
					disabled={!isEditing}
				/>
				<TextField
					sx={{
						mb: 2,
					}}
					label="Data"
					value={editedTask.date}
					defaultValue={format(
						task.createdAt,
						'HH:mm - dd/MM/yyyy'
					)}
					disabled
				/>

				{/* TODO isLoading again?*/}
				{!isLoading &&
					<StatusTabs
						tab={isEditing ? tabValue : task.status}
						onChange={(value) => setTabValue(value)}
						isEditing={isEditing} />
				}
				<Box sx={{ mt: 2, flexGrow: 1 }}>
					<Grid container spacing={2}>
						{isEditing ? (
							<>
								<Grid item xs={6}>
									<Item><Button fullWidth
										onClick={handleCancelClick}>Cancelar</Button></Item>
								</Grid>
								<Grid item xs={6}>
									<Item><Button fullWidth
										onClick={handleSaveClick}>Salvar</Button></Item>
								</Grid>
							</>
						) : (
							<Grid item xs={12}>
								<Item><Button fullWidth
									onClick={handleEditClick}>Editar</Button></Item>
							</Grid>
						)}

					</Grid>
				</Box>
			</Box>
			:
			<>Carregando</>
	);
}

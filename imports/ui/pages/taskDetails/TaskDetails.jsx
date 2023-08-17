import * as React from 'react';
import { useParams } from 'react-router-dom';
import { TaskAltIcon } from '@mui/icons-material';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function TaskDetails() {
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
		return { task: task };
	});

	const onSave = () => {
	};

	const onCancel = () => {
	};

	const [isEditing, setIsEditing] = React.useState(false);
	const [editedTask, setEditedTask] = React.useState({ ...task });
	console.log(editedTask)

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setEditedTask({ ...task });
		setIsEditing(false);
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
		<Box>
			{/* <TaskAltIcon /> */}
			{isEditing ? (
				<TextField
					label="Nome"
					value={editedTask.text}
					onChange={(e) => handleInputChange('text', e.target.value)}
				/>
			) : (
				<Typography variant="h5">{editedTask.text}</Typography>
			)}

			{isEditing ? (
				<TextField
					label="Situação"
					value={editedTask.status}
					onChange={(e) => handleInputChange('status', e.target.value)}
				/>
			) : (
				<Typography>{editedTask.status}</Typography>
			)}

			{isEditing ? (
				<TextField
					label="Data"
					value={editedTask.date}
					onChange={(e) => handleInputChange('date', e.target.value)}
				/>
			) : (
				<Typography>{editedTask.date}</Typography>
			)}

			<Button onClick={() => handleStatusChange('Em Andamento')} disabled={editedTask.status === 'Em Andamento' || isEditing}>
				Mover para Em Andamento
			</Button>
			<Button onClick={() => handleStatusChange('Concluída')} disabled={editedTask.status === 'Concluída' || isEditing}>
				Mover para Concluída
			</Button>
			<Button onClick={() => handleStatusChange('Cadastrada')} disabled={editedTask.status === 'Cadastrada' || isEditing}>
				Mover para Cadastrada
			</Button>

			{isEditing ? (
				<div>
					<Button onClick={handleSaveClick}>Salvar</Button>
					<Button onClick={handleCancelClick}>Cancelar</Button>
				</div>
			) : (
				<Button onClick={handleEditClick}>Editar</Button>
			)}
		</Box>
	);
}

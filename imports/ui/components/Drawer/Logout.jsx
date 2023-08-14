import React from 'react';
import { Meteor } from 'meteor/meteor';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useUserId } from 'meteor/react-meteor-accounts';

export function Logout() {
	const userId = useUserId();
	const navigate = useNavigate();

	const logout = () => {
		Meteor.logout(() => {
			navigate('/');
		});
	};

	return (
		<>
			{userId && (
				<Button
					// fullWidth
					variant="contained"
					sx={{ ml: 1, mr: 1 }}
					onClick={() => {
						logout()
					}}
				>
					Deslogar
				</Button>
			)}
		</>
	);
}

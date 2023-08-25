import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import ListIcon from '@mui/icons-material/List';
import { Avatar, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useTracker } from 'meteor/react-meteor-data';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate, useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, IconButton, List, Toolbar } from '@mui/material';
import { useUser } from 'meteor/react-meteor-accounts';

const iOS =
	typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function Drawer({ open, drawerWidth, toggleDrawer }) {

	const username = useUser()?.username;

	const navigate = useNavigate();
	const location = useLocation();

	const { userProfileImage, isLoading } = useTracker(() => {
		const noDataAvailable = { userProfileImage: {} };
		if (!Meteor.user()) {
			return noDataAvailable;
		}
		const handler = Meteor.subscribe('userProfileImage');

		if (!handler.ready()) {
			return { ...noDataAvailable, isLoading: true };
		}
		const userProfile = Meteor.users.findOne({ _id: Meteor.userId() });
		const userProfileImage = userProfile.profile?.profileImage || ""

		return { userProfileImage, isLoading: false };
	});

	return (
		<>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				anchor={'left'}
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<Box
					sx={{ width: drawerWidth }}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
						<ListSubheader component="div" inset>

						</ListSubheader>
						<ListItemButton onClick={() => location.pathname !== '/perfil' && navigate('/perfil')}>
							<ListItemIcon>
								<Avatar alt={username} src={userProfileImage.base64} />

							</ListItemIcon>
							<ListItemText primary={username} />
						</ListItemButton>
						<Divider sx={{ my: 1 }} />
						<ListItemButton onClick={() => location.pathname !== '/home' && navigate('/home')}>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
						<ListItemButton onClick={() => location.pathname !== '/tasks' && navigate('/tasks')}>
							<ListItemIcon>
								<ListIcon />
							</ListItemIcon>
							<ListItemText primary="Tarefas" />
						</ListItemButton>
					</List>
				</Box>
			</SwipeableDrawer>
		</>
	);
}

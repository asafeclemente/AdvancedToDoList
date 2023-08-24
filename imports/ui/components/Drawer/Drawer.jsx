import React from 'react';
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
import { useHistory, useLocation } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, IconButton, List, Toolbar } from '@mui/material';
import { useUser, useUserId } from 'meteor/react-meteor-accounts';
import { useNavigate } from 'react-router-dom';

export default function Drawer({ open, drawerWidth, toggleDrawer }) {
	const Drawerr = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
		({ theme, open }) => ({
			'& .MuiDrawer-paper': {
				position: 'relative',
				whiteSpace: 'nowrap',
				width: drawerWidth,
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
				boxSizing: 'border-box',
				...(!open && {
					overflowX: 'hidden',
					transition: theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					width: theme.spacing(7),
					[theme.breakpoints.up('sm')]: {
						width: theme.spacing(9),
					},
				}),
			},
		}),
	);

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
		const userProfile= Meteor.users.findOne({ _id: Meteor.userId() });
		const userProfileImage = userProfile.profile.profileImage

		return { userProfileImage, isLoading: false };
	});

	return (
		<>
			<Drawerr variant="permanent" open={open}>
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
						{/* <Typography id="drawer-user-email" variant="caption" ml={2}>
							asafecgm1@gmail.comaaasdfghjk
						</Typography> */}
						<ListSubheader component="div" inset>

						</ListSubheader>
						<ListItemButton onClick={() =>  location.pathname !== '/perfil' && navigate('/perfil')}>
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
								<ListIcon/>
							</ListItemIcon>
							<ListItemText primary="Tarefas" />
						</ListItemButton>
				</List>
			</Drawerr>
		</>
	)
}
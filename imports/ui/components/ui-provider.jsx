import React from 'react';

import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: purple[400],
		},
		secondary: {
			main: green[500],
		},
	},
});

export function UIProvider({ children }) {
	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
}

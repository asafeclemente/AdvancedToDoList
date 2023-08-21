import { Meteor } from 'meteor/meteor';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes } from '../imports/ui/routes';
import { Loading } from '../imports/ui/components/Loading';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    // <UIProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes />
      </LocalizationProvider>
    // </UIProvider>
  );
});




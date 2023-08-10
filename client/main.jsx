import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { Button } from '@mui/material';
import { UIProvider } from '../imports/ui/components/ui-provider';
// import { Routes } from './routes';
// import React, { Suspense } from 'react';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <UIProvider>
      {/* <Suspense fallback={<Loading />}> */}
      {/* <Routes /> */}
      <Button variant="contained">Contained</Button>
      {/* </Suspense> */}
    </UIProvider>
  );
});




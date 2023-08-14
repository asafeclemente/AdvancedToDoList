import { Meteor } from 'meteor/meteor';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes } from '../imports/ui/routes';
import { Loading } from '../imports/ui/components/Loading';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    // <UIProvider>
      <Routes />
    // </UIProvider>
  );
});




import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button } from '@material-ui/core';

import LoginPage from './pages/LoginPage'

export const routes = {
  root: '/',
  notFound: '*',
  tasks: '/tasks',
};

// const NotFoundPage = React.lazy(() =>
//   import('./pages/not-found/not-found-page')
// );
// const TasksPage = React.lazy(() => import('./pages/tasks/tasks-page'));

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          element={
            <Layout loggedOnly={false}>
              <LoginPage />
            </Layout>
          }
          index
        />
        <Route
          element={
            <Layout>
              {/* <TasksPage /> */}
              <Button variant="contained">tasks</Button>
            </Layout>
          }
          path={routes.tasks}
        />
        <Route
          element={
            <Layout loggedOnly={false}>
              {/* <NotFoundPage /> */}
              <Button variant="contained">notfound</Button>
            </Layout>
          }
          path={routes.notFound}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
}

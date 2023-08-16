import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button } from '@material-ui/core';

import LoginPage from './pages/LoginPage'
import Home from './pages/Home';

export const routes = {
  root: '/',
  notFound: '*',
  home: '/home',
  tasks: '/tasks'
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
            <LoginPage />
          }
          index
        />
        <Route
          element={
            <Layout>
              <Home/>
              {/* <Button variant="contained">essa vai ser a home</Button> */}
            </Layout>
          }
          path={routes.home}
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

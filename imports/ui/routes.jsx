import React from 'react';
import { Button } from '@material-ui/core';
import { Layout } from './components/Layout';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage'
import TasksList from './pages/tasksList/TasksList';

export const routes = {
  root: '/',
  notFound: '*',
  home: '/home',
  tasks: '/tasks'
};

// const NotFoundPage = React.lazy(() =>
//   import('./pages/not-found/not-found-page')
// );

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
              <TasksList />
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

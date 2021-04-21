import React from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react/oauth';
import Main from 'components/views/Main';
import NotFound from 'components/views/NotFound';

import Ecoregions from 'components/views/Ecoregions.js';
import EcoregionsSidebar from 'components/views/EcoregionsSidebar.js';
import SingleEcoregionDetail from 'components/views/SingleEcoregionDetail.js';

// Auto import
const routes = [
  {
    path: '/',
    element: <Main />,
    // children: [
    //   // { path: '/', element: <Navigate to='/<your default view>' /> },
    //   { path: '/ecoregions', element: <Ecoregions/> },

    //   // Auto import routes
    // ],
    children: [
      { path: '/', element: <Navigate to='/ecoregions' /> },
      {
        path: '/ecoregions',
        element: <Ecoregions />,
        children: [
          { path: '/', element: <EcoregionsSidebar /> },
          { path: '/:id', element: <SingleEcoregionDetail /> },
        ],
      },
    ],
  },
  { path: '/ecoregions',  element: <Navigate to='/ecoregions' /> },
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;

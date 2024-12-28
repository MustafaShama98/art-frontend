// All components mapping with path for internal routes

import { lazy } from 'react'

const Login = lazy(() => import('../pages/Login'))
//const Page404 = lazy(() => import('../pages/protected/404'))
//const Blank = lazy(() => import('../pages/protected/Blank'))
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))

const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const WelcomeW = lazy(() => import('../pages/protected/WelcomeW'))
const HelpAdmin = lazy(() => import('../pages/protected/HelpAdmin'))
//const DocFeatures = lazy(() => import('../pages/DocFeatures'))
//const DocComponents = lazy(() => import('../pages/DocComponents'))
const HelpWorker = lazy(() => import('../pages/protected/HelpWorker'))
const history=lazy(() => import('../pages/protected/history'))

const routes = [
 
    // Admin routes
    {
      path: '/welcome',
      component: Welcome,
    },
    {
      path: '/Paintings',
      component: Leads,
    },
    {
      path: '/charts',
      component: Charts,
    },
    {
      path: '/HelpAdmin',
      component: HelpAdmin,
    },
    {
      path: '/history',
      component: history,
    },
   
    // Worker routes
    {
      path: '/welcomew',
      component: WelcomeW,
    },

    {
      path: '/HelpWorker',
      component: HelpWorker,
    },
   
    
  
    // Common route
    {
      path: '/login',
      component: Login,
    },
     {
    path: '/dashboard',
    component: Dashboard,
  },
  ];
  

  
 

 /* {
    path: '/components',
    component: DocComponents,
  },*/

 
  /*{
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },*/


export default routes

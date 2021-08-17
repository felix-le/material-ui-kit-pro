import { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DocsLayout from 'src/layouts/DocsLayout';
import HomeView from 'src/views/pages/HomeView';
import MainLayout from 'src/layouts/MainLayout';
import LoadingScreen from 'src/components/LoadingScreen';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to='/home' />,
  },
  {
    exact: true,
    path: '/404',
    component: () => lazy(() => import('src/views/pages/Error404View')),
  },
  {
    exact: true,
    path: '/login',
    component: () => lazy(() => import('src/views/auth/LoginView')),
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: () => lazy(() => import('src/views/auth/LoginView')),
  },
  {
    exact: true,
    path: '/register',
    component: () => lazy(() => import('src/views/auth/RegisterView')),
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView')),
  },
  {
    path: '/app',
    // guard:
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to='/app/reports/dashboard' />,
      },
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/pages/AccountView')),
      },
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView')),
      },
    ],
  },
  {
    path: '/docs',
    layout: DocsLayout,
    routest: [
      {
        exact: true,
        path: '/docs',
        component: () => <Redirect to='/docs/welcome' />,
      },
      {
        exact: true,
        path: '/docs/welcome',
        component: lazy(() => import('src/views/docs/WelcomeView')),
      },
    ],
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView,
      },
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pages/PricingView')),
      },
      {
        component: () => <Redirect to='/404' />,
      },
    ],
  },
];

const renderRoutes = (routes) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;

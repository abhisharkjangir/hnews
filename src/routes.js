/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import universal from 'react-universal-component';
import { Route, Switch } from 'react-router-dom';
import universalOptions from './utils/universalOptions';
import { fetchNews } from './containers/pages/Home/actions';

const Home = universal(
  import(/* webpackChunkName: "home-page" */ './containers/pages/Home/Home'),
  universalOptions
);

const Notfound = universal(
  import(
    /* webpackChunkName: "notfound-page" */ './components/pages/notfound/notfound'
  ),
  universalOptions
);

export const RouteList = [
  { path: '/', component: Home, exact: true, fetchRouteData: [fetchNews] },
  {
    component: Notfound,
  },
];

export default () => (
  <Switch>
    {RouteList.map((route, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Route key={index} {...route} />
    ))}
  </Switch>
);

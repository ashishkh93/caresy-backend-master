const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const formRoute = require('./form.route');
const referralRoute = require('./referral.route');
const docsRoute = require('./docs.route');
const babyRoute = require('./baby.route');
const growthRoute = require('./growth.route');
const itemRoute = require('./item.route');
const transactionRoute = require('./transaction.route');
const activityRoute = require('./activity.route');
const questionRoute = require('./qna.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/forms',
    route: formRoute,
  },
  {
    path: '/baby',
    route: babyRoute,
  },
  {
    path: '/bg',
    route: growthRoute,
  },
  {
    path: '/transaction',
    route: transactionRoute,
  },
  {
    path: '/item',
    route: itemRoute,
    path: '/referral',
    route: referralRoute,
    route: babyRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/activity',
    route: activityRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

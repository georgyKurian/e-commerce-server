import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import './db/index';
import responseTime from 'response-time';
import dotenv from 'dotenv';
import logger from './middlewear/logger';
import withAuthentication from './middlewear/withAuthentication';
import withAdminPermission from './middlewear/withAdminPermission';
import getProductsRoutes from './routes/products';
import getReviewRoutes from './routes/reviews';
import getUserRoutes from './routes/users';
import getAuthRoutes from './routes/auth';
import getOrderRoutes from './routes/orders';
import getStripeHookRoutes from './routes/stripeHook';

dotenv.config();

const app = express();
const port = process.env.PORT || 8085; // process.env.PORT
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
const webRouter = express.Router();
const stripeWebHookRouter = express.Router();


// middlewears
app.use(
  responseTime((req, res, time) => {
    console.log('=> ', req.method, req.originalUrl, ' || ', time, ' ms');
  }),
);

app.use(helmet());
app.use(cors(process.env !== 'production' ? undefined : corsOptions));
app.use(logger);

// Web hook
app.use('/v1/stripe/webhook',stripeWebHookRouter);
getStripeHookRoutes(stripeWebHookRouter);


// App Routes Middlewear
webRouter.use(bodyParser.json());
webRouter.use(bodyParser.urlencoded({ extended: true }));
webRouter.use(withAuthentication);
webRouter.use(withAdminPermission);

// App Routes
getProductsRoutes(webRouter);
getUserRoutes(webRouter);
getAuthRoutes(webRouter);
getOrderRoutes(webRouter);
getReviewRoutes(webRouter);

app.use('',webRouter);

// Webhook Route

// Catches 404
app.use((req, res, next) => {
  res.status(400).end();
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

/**
 * Listening to port
 */
app.listen(port, () => {
  console.log(`App listening on port ${port}! http://localhost:${port}`);
});

import { Router } from 'express';
import tokenizedRouter from './modules/Tokenized/adapters/routes/tokenizedRoutes';

const routes = Router();

routes.use('/api/v1/card', tokenizedRouter);

export default routes;

import express from 'express';

import {
    getTokenizedController,
    postTokenizedController
} from '../controllers';

import { getTokenizedMiddleware } from '../middlewares/getTokenizedMiddleware';
import { postTokenizedMiddleware } from '../middlewares/postTokenizedMiddleware';

const tokenizedRouter = express.Router();

tokenizedRouter.get('/:token', getTokenizedMiddleware, getTokenizedController);
tokenizedRouter.post('/tokenize', postTokenizedMiddleware, postTokenizedController);


export default tokenizedRouter;
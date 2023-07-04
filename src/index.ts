import express, { Express } from 'express';
import routes from "./routes";
import cors from 'cors';
import { errorMiddleware } from './shared/middlewares/errorMiddleware';
import { connectToMongoDB } from './shared/config/mongoConfig';

const app: Express = express();
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 5000;
app.use(cors());

connectToMongoDB();

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

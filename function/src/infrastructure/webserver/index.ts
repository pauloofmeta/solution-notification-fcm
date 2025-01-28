import expres from 'express';
import cors from 'cors';
import { scopePerRequest, loadControllers } from 'awilix-express';
import {
  databaseMiddleware,
  errorMiddleware,
  morganMiddleware,
} from '@interfaces/middlewares';
import { container } from '@infrastructure/contianer';

const app = expres();
app.use(cors());
app.use(expres.json());
app.use(scopePerRequest(container));
app.use(morganMiddleware);
app.use(databaseMiddleware);

app.get('/', (_req, res) => {
  res.status(200).send({ status: 'OK', message: 'API Working' });
});

const router = loadControllers('../../interfaces/controllers/*.js', {
  cwd: __dirname,
});

app.use('/api', router);
app.use(errorMiddleware);

export default app;

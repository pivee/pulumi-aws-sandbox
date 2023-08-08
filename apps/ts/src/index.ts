import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!');
});

app.get('/secret', (req: Request, res: Response) => {
  res.send(process.env.ENV_SECRET);
});

app.listen(port, () => {
  console.log(`Hello World on port ${port}`);
});

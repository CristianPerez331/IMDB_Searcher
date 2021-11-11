import express from 'express';
import cors from 'cors';
import routes from './routes/routes';

const app = express();
const port = 8001;

app.use(cors());

app.use('/api/v1',  routes);

app.listen(port, () => console.log(`App Started On Port ${port}`))

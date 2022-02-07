import express, { Application, Request, Response } from 'express';

const weather = require('./routing/weather');
const app: Application = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes from routeing/weather.ts */
app.use('/weather', weather);

app.get(
    '/',
    async (req: Request, res: Response): Promise<Response> => res.status(200).send({ message: 'Hello from your Server!' })
);

const port = process.env.PORT || 3000;
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
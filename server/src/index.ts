import express, { Application, Request, Response } from 'express';
import { WeatherApi } from './weatherApi';

const app: Application = express();
const port = 3000;

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    '/weather',
    async (req: Request, res: Response): Promise<Response> => res.send(await new WeatherApi().getWeatherData())
);

app.get(
    '/',
    async (req: Request, res: Response): Promise<Response> => res.status(200).send({ message: 'Hello World!' })
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
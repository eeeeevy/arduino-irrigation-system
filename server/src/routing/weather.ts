import { Request, Response } from 'express';
import { get } from 'https';
import { IncomingMessage } from 'http';

const express = require('express');
const router = express.Router();

const getWeatherData = async (): Promise<object> => {
    const weatherDataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.API_KEY}&units=metric&exclude=minutely,alerts&lang=${process.env.LANGUAGE}`;

    return new Promise((resolve, reject) => {
        get(weatherDataUrl, (res: IncomingMessage) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
    });
}

router.get(
    '/',
    async (req: Request, res: Response): Promise<Response> => res.send(await getWeatherData())
);

module.exports = router;
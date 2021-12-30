import * as https from 'https';
import { IncomingMessage } from 'http';

export class WeatherApi {
    getWeatherData = async (): Promise<object> => {
        const weatherDataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.API_KEY}&units=metric&exclude=minutely,alerts&lang=${process.env.LANGUAGE}`;

        return new Promise((resolve, reject) => {
            https.get(weatherDataUrl, (res: IncomingMessage) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => resolve(JSON.parse(body)));
            }).on('error', reject);
        });
    }
}
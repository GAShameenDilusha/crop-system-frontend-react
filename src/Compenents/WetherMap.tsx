import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
    name: string;
    weather: { description: string }[];
    main: { temp: number; humidity: number };
}

const WeatherForecast: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather',
                    {
                        params: {
                            q: 'Colombo,Sri Lanka',
                            appid: 'bae6e515f708bd07df598163c8e07210',
                            units: 'metric',
                        },
                    }
                );

                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'clear sky':
                return '☀️';
            case 'few clouds':
                return '🌤️';
            case 'scattered clouds':
                return '☁️';
            case 'broken clouds':
                return '🌥️';
            case 'overcast clouds':
                return '☁️';
            case 'light rain':
                return '🌦️';
            case 'moderate rain':
                return '🌧️';
            case 'heavy intensity rain':
                return '🌧️';
            case 'thunderstorm':
                return '⛈️';
            case 'drizzle':
                return '🌦️';
            case 'mist':
            case 'fog':
                return '🌫️';
            default:
                return '❓';
        }
    };

    if (!weatherData) {
        return <div className="text-center mt-10">Loading weather data...</div>;
    }

    const weatherIcon = getWeatherIcon(weatherData.weather[0].description);

    return (
        <div className="max-w-sm bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6 mt-10 min-h-96 mx-auto md:mx-80 border border-white/20">
            <div className="flex justify-between items-center">
                <div className="text-center mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-itim">
                        Weather in {weatherData.name}
                    </h2>
                    <div className="text-8xl mb-6">{weatherIcon}</div>
                    <p className="text-center mt-4 text-gray-600 capitalize">
                        {weatherData.weather[0].description}
                    </p>
                </div>
            </div>

            <div className="flex justify-evenly items-center mt-10">
                <div className="flex items-center">
                    <img src="src/assets/images/temp.png" alt="Temperature" className="w-10 h-10 mr-2" />
                    <p className="text-lg md:text-2xl font-medium">{weatherData.main.temp}°C</p>
                </div>

                <div className="flex items-center">
                    <img src="src/assets/images/wind.png" alt="Humidity" className="w-12 h-12 mr-2" />
                    <p className="text-lg md:text-2xl font-medium">{weatherData.main.humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;
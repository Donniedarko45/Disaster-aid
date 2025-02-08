const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export interface WeatherData {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "stormy";
  windSpeed: number;
  humidity: number;
  alerts: string[];
  location: string;
}

export interface LocationSearchResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    // First, check if we have an API key
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured');
    }

    // Make the weather API call first
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    // Handle API errors
    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json();
      if (errorData.cod === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();

    // Validate weather data
    if (!weatherData.main || typeof weatherData.main.temp === 'undefined') {
      throw new Error('Invalid weather data received');
    }

    // Map OpenWeatherMap conditions to our app's conditions
    const conditionMap: { [key: string]: "sunny" | "cloudy" | "rainy" | "stormy" } = {
      Clear: "sunny",
      Clouds: "cloudy",
      Rain: "rainy",
      Drizzle: "rainy",
      Thunderstorm: "stormy",
    };

    // Get the main weather condition
    const mainCondition = weatherData.weather?.[0]?.main || 'Clouds';

    // Create mock alerts for now since the onecall endpoint requires paid subscription
    const mockAlerts = [];
    if (weatherData.main.temp > 30) {
      mockAlerts.push('High temperature alert');
    } else if (weatherData.main.temp < 0) {
      mockAlerts.push('Low temperature alert');
    }
    if (weatherData.wind?.speed > 20) {
      mockAlerts.push('Strong wind alert');
    }

    return {
      temperature: Math.round(weatherData.main.temp),
      condition: conditionMap[mainCondition] || "cloudy",
      windSpeed: Math.round((weatherData.wind?.speed || 0) * 3.6), // Convert m/s to km/h
      humidity: weatherData.main.humidity || 0,
      alerts: mockAlerts,
      location: weatherData.name || 'Unknown Location'
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getLocationFromPincode(pincode: string) {
  try {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured');
    }

    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${pincode}&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch location data');
    }

    const data = await response.json();

    if (!data.lat || !data.lon) {
      throw new Error('Invalid location data received');
    }

    return {
      lat: data.lat,
      lon: data.lon,
      name: data.name || 'Unknown Location'
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}

export async function validateApiKey(): Promise<boolean> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=0&lon=0&appid=${API_KEY}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.cod === 401) {
        return false;
      }
    }
    return response.ok;
  } catch {
    return false;
  }
}

export async function searchLocations(query: string): Promise<LocationSearchResult[]> {
  try {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured');
    }

    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch location data');
    }

    const data = await response.json();
    return data.map((item: any) => ({
      name: item.name,
      lat: item.lat,
      lon: item.lon,
      country: item.country,
      state: item.state
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
} 
export interface WeatherData {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "stormy";
  windSpeed: number;
  humidity: number;
  alerts: string[];
  location: string;
}

export interface GeoLocation {
  lat: number;
  lon: number;
  name: string;
} 
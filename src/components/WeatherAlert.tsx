import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin, Loader2, Search, Navigation } from "lucide-react";
import { 
  WeatherData, 
  fetchWeatherData, 
  validateApiKey, 
  searchLocations,
  LocationSearchResult 
} from "../services/weatherService";

export default function WeatherAlert() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      setError(null);
      const results = await searchLocations(searchQuery);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search locations');
    } finally {
      setSearching(false);
    }
  };

  const handleLocationSelect = async (location: LocationSearchResult) => {
    try {
      setLoading(true);
      setError(null);
      setShowSearchResults(false);
      setSearchQuery(`${location.name}, ${location.country}`);
      
      const weatherData = await fetchWeatherData(location.lat, location.lon);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowSearchResults(false);
      setSearchQuery("");

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 0
        });
      });

      const weatherData = await fetchWeatherData(
        position.coords.latitude,
        position.coords.longitude
      );
      
      setWeather(weatherData);
    } catch (err) {
      let errorMessage = 'Failed to load weather data';
      if (err instanceof Error) {
        if (err.message.includes('permission denied')) {
          errorMessage = 'Please enable location access to use this feature';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUseCurrentLocation();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 border dark:border-gray-700">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">Loading weather data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 border dark:border-gray-700">
        <div className="text-red-500 dark:text-red-400 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 border dark:border-gray-700">
      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <div className="flex space-x-2 mb-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search location..."
                className="w-full border dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {searching ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
            </button>
            <button
              onClick={handleUseCurrentLocation}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg"
              title="Use current location"
            >
              <Navigation className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(result)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {result.name}, {result.state && `${result.state}, `}{result.country}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Weather Conditions
        </h3>
        {weather && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            {weather.location}
          </div>
        )}
      </div>

      {weather && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Temperature and Condition */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center">
                {weather.condition === "sunny" && <Sun className="h-8 w-8 text-yellow-500" />}
                {weather.condition === "cloudy" && <Cloud className="h-8 w-8 text-gray-500" />}
                {weather.condition === "rainy" && <CloudRain className="h-8 w-8 text-blue-500" />}
                <span className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {weather.temperature}°C
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">
                {weather.condition}
              </p>
            </div>

            {/* Wind and Humidity */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Wind className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {weather.windSpeed} km/h
                  </span>
                </div>
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {weather.humidity}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Alerts */}
          {weather.alerts.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
              <h4 className="text-red-800 dark:text-red-200 font-medium mb-2">
                Weather Alerts
              </h4>
              <ul className="space-y-2">
                {weather.alerts.map((alert, index) => (
                  <li
                    key={index}
                    className="text-red-700 dark:text-red-300 text-sm"
                  >
                    {alert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


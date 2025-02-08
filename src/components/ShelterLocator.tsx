import React, { useState } from "react";
import { Home, Search, Phone, Users, MapPin, Star } from "lucide-react";
import { Shelter } from "../types/index";
import LoadingSpinner from "./LoadingSpinner";

// Dummy data for testing
const dummyShelters: Shelter[] = [
  {
    id: "1",
    name: "Emergency Relief Center",
    address: "123 Main Street, Downtown",
    latitude: 30.618338,
    longitude: -96.323712,
    rating: 4.5,
    organizationType: "Government",
    currentOccupancy: 45,
    capacity: 100,
    contactNumber: "+1 (555) 123-4567",
    facilities: ["Medical Care", "Food Service", "Beds", "Shower"]
  },
  {
    id: "2",
    name: "Community Safe Haven",
    address: "456 Oak Avenue, Midtown",
    latitude: 30.620338,
    longitude: -96.325712,
    rating: 4.2,
    organizationType: "NGO",
    currentOccupancy: 25,
    capacity: 50,
    contactNumber: "+1 (555) 987-6543",
    facilities: ["Beds", "Kitchen", "Child Care", "WiFi"]
  },
  {
    id: "3",
    name: "Red Cross Shelter",
    address: "789 Pine Road, Uptown",
    latitude: 30.622338,
    longitude: -96.327712,
    rating: 4.8,
    organizationType: "NGO",
    currentOccupancy: 75,
    capacity: 150,
    contactNumber: "+1 (555) 246-8135",
    facilities: ["Medical Care", "Food Service", "Beds", "Counseling", "Pet Friendly"]
  }
];

// Replace the fetchShelters function with this one
const fetchShelters = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyShelters;
};

export default function ShelterLocator() {
  const [pincode, setPincode] = useState("");
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!pincode) return;

    setLoading(true);
    try {
      const shelterResults = await fetchShelters();
      setShelters(shelterResults);
    } catch (error) {
      console.error("Error fetching shelter data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 border dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Home className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Find Nearby Shelters
        </h2>
      </div>

      {/* Search Box */}
      <div className="flex space-x-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Pincode"
            className="w-full border dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={handleSearch}
          disabled={!pincode}
          className={`px-6 py-2 rounded-lg flex items-center transition-colors ${
            pincode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-4">
          {shelters.length > 0 ? (
            shelters.map((shelter) => (
              <div
                key={shelter.id}
                className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-black"
              >
                {/* Shelter Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {shelter.name}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4 mr-1" />
                      <p>{shelter.address}</p>
                    </div>
                  </div>
                  {shelter.rating && (
                    <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                        {shelter.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Shelter Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Capacity:{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {shelter.currentOccupancy}/{shelter.capacity}
                      </span>
                    </span>
                  </div>
                  {shelter.contactNumber && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Contact:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {shelter.contactNumber}
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Facilities Tags */}
                {shelter.facilities && shelter.facilities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {shelter.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="mb-4">
                <Search className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No shelters found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try searching with a different pincode
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



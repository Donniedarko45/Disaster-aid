import React, { useState } from "react";
import { Home, Search } from "lucide-react";
import { Shelter } from "../types";
import LoadingSpinner from "./LoadingSpinner";

const SAMPLE_SHELTERS: Shelter[] = [
  {
    id: "1",
    name: "Community Relief Center",
    address: "123 Main Street, Downtown",
    pincode: "400001",
    capacity: 200,
    currentOccupancy: 150,
    contactNumber: "+1-555-0123",
    facilities: ["Food", "Medical Care", "Bedding"],
    organizationType: "NGO",
  },
  {
    id: "2",
    name: "Government Emergency Shelter",
    address: "456 Park Avenue, Midtown",
    pincode: "400001",
    capacity: 300,
    currentOccupancy: 200,
    contactNumber: "+1-555-0124",
    facilities: ["Food", "Medical Care", "Bedding", "Child Care"],
    organizationType: "Government",
  },
];

export default function ShelterLocator() {
  const [pincode, setPincode] = useState("");
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!pincode) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShelters(
        SAMPLE_SHELTERS.filter((shelter) => shelter.pincode === pincode),
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <Home className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Find Nearby Shelters
        </h2>
      </div>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
          className="flex-1 border dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors flex items-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {shelters.map((shelter) => (
            <div
              key={shelter.id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-black"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {shelter.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {shelter.address}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    shelter.organizationType === "NGO"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  }`}
                >
                  {shelter.organizationType}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Capacity:
                  </span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {shelter.currentOccupancy}/{shelter.capacity}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Contact:
                  </span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {shelter.contactNumber}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {shelter.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {shelters.length === 0 && !loading && pincode && (
            <div className="text-center py-8 text-gray-600">
              No shelters found in this area. Please try a different pincode.
            </div>
          )}
        </div>
      )}
    </div>
  );
}


import React, { useState, Suspense } from "react";
import { Activity, Users, Truck, AlertTriangle } from "lucide-react";
import { Resource, DisasterZone, AllocationRecommendation } from "../types";
import { calculateResourceAllocation } from "../utils/allocationAlgorithm";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import LoadingSpinner from "./LoadingSpinner";
import NotificationSystem from "./NotificationSystem";
import WeatherAlert from "./WeatherAlert";
import EmergencyContacts from "./EmergencyContacts";

// Lazy load components
const Chat = React.lazy(() => import("./Chat"));
const ShelterLocator = React.lazy(() => import("./ShelterLocator"));

const mockResources: Resource[] = [
  {
    id: "1",
    type: "medical",
    name: "Emergency Medical Kits",
    quantity: 1000,
    location: { lat: 34.0522, lng: -118.2437 },
    status: "available",
  },
];

const mockDisasterZones: DisasterZone[] = [
  {
    id: "1",
    severity: 4,
    populationDensity: 5000,
    location: { lat: 34.0522, lng: -118.2437 },
    resourceNeeds: {
      medical: 500,
      personnel: 100,
      equipment: 50,
    },
  },
];

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState<
    AllocationRecommendation[]
  >([]);
  const [activeTab, setActiveTab] = useState<"allocation" | "chat" | "shelter">(
    "allocation",
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newRecommendations = calculateResourceAllocation(
      mockResources,
      mockDisasterZones,
    );
    setRecommendations(newRecommendations);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black transition-colors duration-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <Breadcrumb activeTab={activeTab} />
              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {activeTab === "allocation"
                  ? "Resource Allocation Dashboard"
                  : activeTab === "chat"
                    ? "Emergency Communication"
                    : "Find Emergency Shelter"}
              </h1>
            </div>
            <NotificationSystem />
          </div>

          {/* Alert Banner */}
          <div className="mb-8 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <span className="text-red-800 dark:text-red-200 font-medium">
                Active Emergency Alerts: {mockDisasterZones.length} disaster
                zones require immediate attention
              </span>
            </div>
          </div>

          <div className="animate-fade-in">
            {activeTab === "allocation" && (
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <Activity className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Active Disaster Zones
                        </h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                          {mockDisasterZones.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Affected Population
                        </h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                          {mockDisasterZones
                            .reduce(
                              (sum, zone) => sum + zone.populationDensity,
                              0,
                            )
                            .toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Available Resources
                        </h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                          {mockResources.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Weather Alert */}
                    <WeatherAlert />

                    {/* Resource Allocation */}
                    <div className="bg-white dark:bg-black shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
                      <div className="p-6 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Resource Allocation Recommendations
                        </h3>
                        <button
                          onClick={handleOptimize}
                          disabled={isLoading}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                                   transition-all duration-200 transform hover:scale-105 disabled:opacity-50
                                   disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {isLoading ? "Optimizing..." : "Optimize Allocation"}
                        </button>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700">
                        {isLoading ? (
                          <LoadingSpinner />
                        ) : (
                          <div className="p-6 space-y-4">
                            {recommendations.map((rec) => (
                              <div
                                key={rec.disasterZoneId}
                                className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 pb-4"
                              >
                                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                  Disaster Zone {rec.disasterZoneId}
                                </h4>
                                <div className="mt-4 space-y-3">
                                  {rec.resources.map((resource) => (
                                    <div
                                      key={resource.resourceId}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-gray-600 dark:text-gray-300">
                                        Resource {resource.resourceId}
                                      </span>
                                      <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                          Priority:{" "}
                                          {resource.priority.toFixed(2)}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                          Quantity:{" "}
                                          {resource.recommendedQuantity}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {recommendations.length === 0 && (
                              <div className="text-center text-gray-500 dark:text-gray-400">
                                Click "Optimize Allocation" to generate
                                recommendations
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Emergency Contacts */}
                    <EmergencyContacts />

                    {/* Recent Updates */}
                    <div className="bg-white dark:bg-black rounded-lg shadow-lg border dark:border-gray-700">
                      <div className="p-4 border-b dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Recent Updates
                        </h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            New team deployed
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            10 minutes ago
                          </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            Resources allocated
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            25 minutes ago
                          </p>
                        </div>
                        <div className="border-l-4 border-yellow-500 pl-4">
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            Weather alert issued
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            1 hour ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <Suspense fallback={<LoadingSpinner />}>
                <Chat />
              </Suspense>
            )}

            {activeTab === "shelter" && (
              <Suspense fallback={<LoadingSpinner />}>
                <ShelterLocator />
              </Suspense>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

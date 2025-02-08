
import { MapContainer,Circle, TileLayer, Marker, Popup } from 'react-leaflet';
import { Resource, DisasterZone } from '../types';

interface ResourceMapProps {
  resources: Resource[];
  disasterZones: DisasterZone[];
}

export default function ResourceMap({ resources, disasterZones }: ResourceMapProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resource Distribution Map</h3>
      
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer center={[0, 0]} zoom={2} className="h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {resources.map(resource => (
            <Marker 
              key={resource.id} 
              position={[resource.location.lat, resource.location.lng]}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{resource.name}</h4>
                  <p className="text-sm">Quantity: {resource.quantity}</p>
                  <p className="text-sm">Status: {resource.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {disasterZones.map(zone => (
            <Circle
              key={zone.id}
              center={[zone.location.lat, zone.location.lng]}
              radius={zone.severity * 10000}
              pathOptions={{ color: 'red', fillColor: 'red' }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">Disaster Zone {zone.id}</h4>
                  <p className="text-sm">Severity: {zone.severity}/5</p>
                  <p className="text-sm">Population: {zone.populationDensity}</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
} 
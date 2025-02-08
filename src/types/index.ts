export interface Resource {
  id: string;
  type: 'medical' | 'personnel' | 'equipment';
  name: string;
  quantity: number;
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'deployed' | 'in-transit';
}

export interface DisasterZone {
  id: string;
  severity: 1 | 2 | 3 | 4 | 5; // 1 being lowest, 5 being highest
  populationDensity: number;
  location: {
    lat: number;
    lng: number;
  };
  resourceNeeds: {
    medical: number;
    personnel: number;
    equipment: number;
  };
}

export interface AllocationRecommendation {
  disasterZoneId: string;
  resources: {
    resourceId: string;
    priority: number;
    recommendedQuantity: number;
  }[];
  expectedImpact: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  organizationType: 'NGO' | 'Government' | 'Emergency Response';
}

export interface Shelter {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  organizationType: string;
  currentOccupancy: number;
  capacity: number;
  contactNumber: string;
  facilities: string[];
}
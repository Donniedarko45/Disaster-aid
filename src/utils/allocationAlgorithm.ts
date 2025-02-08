import { Resource, DisasterZone, AllocationRecommendation } from '../types';

// Simplified AI algorithm for resource allocation
export function calculateResourceAllocation(
  resources: Resource[],
  disasterZones: DisasterZone[]
): AllocationRecommendation[] {
  return disasterZones.map(zone => {
    const availableResources = resources.filter(r => r.status === 'available');
    
    // Calculate priority based on severity and population density
    const priority = zone.severity * Math.log(zone.populationDensity);
    
    // Calculate resource recommendations
    const recommendations = availableResources.map(resource => ({
      resourceId: resource.id,
      priority: calculatePriority(zone, resource),
      recommendedQuantity: calculateRecommendedQuantity(zone, resource),
    }));
    
    return {
      disasterZoneId: zone.id,
      resources: recommendations,
      expectedImpact: calculateExpectedImpact(zone, recommendations),
    };
  });
}

function calculatePriority(zone: DisasterZone, resource: Resource): number {
  // Priority calculation based on severity, population density, and resource type
  const severityWeight = zone.severity / 5;
  const densityWeight = Math.log(zone.populationDensity) / 10;
  
  return severityWeight + densityWeight;
}

function calculateRecommendedQuantity(zone: DisasterZone, resource: Resource): number {
  // Basic quantity calculation based on population and severity
  const baseQuantity = Math.ceil(zone.populationDensity / 1000);
  return Math.min(baseQuantity * zone.severity, resource.quantity);
}

function calculateExpectedImpact(
  zone: DisasterZone,
  recommendations: { priority: number; recommendedQuantity: number }[]
): number {
  // Calculate expected impact based on recommendations and zone characteristics
  const totalPriority = recommendations.reduce((sum, rec) => sum + rec.priority, 0);
  const coverageRatio = recommendations.reduce((sum, rec) => sum + rec.recommendedQuantity, 0) / 
    (zone.resourceNeeds.medical + zone.resourceNeeds.personnel + zone.resourceNeeds.equipment);
  
  return totalPriority * coverageRatio * zone.severity;
}
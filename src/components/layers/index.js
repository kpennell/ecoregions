import GeocoderLayer from './GeocoderLayer';
import EcoregionsLayer from './EcoregionsLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    EcoregionsLayer(),
    // Auto import layers
  ];
};

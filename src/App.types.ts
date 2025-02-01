export interface IGeojson extends GeoJSON.GeoJsonObject {
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: {
    type: string;
    properties: {
      id: number;
      name: string;
      setor: string;
      zona: string;
    };
    geometry: {
      type: string;
      coordinates: number[][][][];
    };
  }[];
}

export interface IPopulation {
  id_geometria: number;
  ano: string;
  populacao: number;
}

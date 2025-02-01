import { GeoJSON } from "react-leaflet";

export interface IGeojsonEntity extends GeoJSON.GeoJsonObject {
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

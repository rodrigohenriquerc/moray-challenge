import { LoadGeojson } from "../data/load-geojson";
import { LoadNeighborhoods } from "../data/load-neighborhoods";
import { LoadPopulation } from "../data/load-population";
import { HttpClient } from "../infra/http-client";

export const makeLoadNeightborhoods = () => {
  const httpClient = new HttpClient();

  const loadGeojson = new LoadGeojson(httpClient);
  const loadPopulation = new LoadPopulation(httpClient);

  return new LoadNeighborhoods(loadGeojson, loadPopulation);
};

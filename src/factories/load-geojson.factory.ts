import { LoadGeojson } from "../data/load-geojson";
import { HttpClient } from "../infra/http-client";

export const makeLoadGeojson = () => {
  const httpClient = new HttpClient();
  return new LoadGeojson(httpClient);
};

import { LoadPopulation } from "../data/load-population";
import { HttpClient } from "../infra/http-client";

export const makeLoadPopulation = () => {
  const httpClient = new HttpClient();
  return new LoadPopulation(httpClient);
};

import { IGeojsonEntity } from "../entities/Geojson.entity";
import { IPopulationEntity } from "../entities/Population.entity";

export declare namespace ILoadNeighborhoodsUseCase {
  export type TStatus =
    | "geojson_failed"
    | "population_failed"
    | "both_failed"
    | "success";

  export type TResourceStatus = "fulfilled" | "rejected";

  export interface IResponse {
    status: TStatus;
    geojson: {
      status: TResourceStatus;
      data: IGeojsonEntity | null;
    };
    population: {
      status: TResourceStatus;
      data: IPopulationEntity[];
    };
  }
}

export interface ILoadNeighborhoodsUseCase {
  handle: () => Promise<ILoadNeighborhoodsUseCase.IResponse>;
}

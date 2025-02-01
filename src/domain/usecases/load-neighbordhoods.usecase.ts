import { IGeojsonEntity } from "../entities/geojson.entity";
import { IPopulationEntity } from "../entities/population.entity";

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

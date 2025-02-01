import { ILoadGeojsonUseCase } from "../domain/usecases/load-geojson.usecase";
import { ILoadPopulationUseCase } from "../domain/usecases/load-population.usecase";
import { ILoadNeighborhoodsUseCase } from "../domain/usecases/load-neighbordhoods.usecase";

export class LoadNeighborhoods implements ILoadNeighborhoodsUseCase {
  constructor(
    private readonly loadGeojson: ILoadGeojsonUseCase,
    private readonly loadPopulation: ILoadPopulationUseCase
  ) {}

  handle = async (): Promise<ILoadNeighborhoodsUseCase.IResponse> => {
    const [geojson, population] = await Promise.allSettled([
      this.loadGeojson.handle(),
      this.loadPopulation.handle(),
    ]);

    return {
      status: this.defineStatus(geojson.status, population.status),
      geojson: {
        status: geojson.status,
        data: geojson.status === "fulfilled" ? geojson.value : null,
      },
      population: {
        status: population.status,
        data: population.status === "fulfilled" ? population.value : [],
      },
    };
  };

  private defineStatus = (
    geojsonStatus: ILoadNeighborhoodsUseCase.TResourceStatus,
    populationStatus: ILoadNeighborhoodsUseCase.TResourceStatus
  ): ILoadNeighborhoodsUseCase.TStatus => {
    if (geojsonStatus === "fulfilled" && populationStatus === "fulfilled") {
      return "success";
    }

    if (geojsonStatus === "rejected" && populationStatus === "rejected") {
      return "both_failed";
    }

    if (geojsonStatus === "rejected") {
      return "geojson_failed";
    }

    return "population_failed";
  };
}

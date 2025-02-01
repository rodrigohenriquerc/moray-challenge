import { IGeojsonEntity } from "../domain/entities/geojson.entity";
import { ILoadGeojsonUseCase } from "../domain/usecases/load-geojson.usecase";
import { IHttpClient } from "../types";

export class LoadGeojson implements ILoadGeojsonUseCase {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async () => {
    try {
      const response = await this.httpClient.handle<IGeojsonEntity>({
        url: "/bairros-geojson",
        method: "get",
      });

      return response.data;
    } catch (e) {
      throw e;
    }
  };
}

import { IPopulationEntity } from "../domain/entities/population.entity";
import { ILoadPopulationUseCase } from "../domain/usecases/load-population.usecase";
import { IHttpClient } from "../types";

export class LoadPopulation implements ILoadPopulationUseCase {
  constructor(private readonly httpClient: IHttpClient) {}

  handle = async () => {
    try {
      const response = await this.httpClient.handle<IPopulationEntity[]>({
        url: "/populacao",
        method: "get",
      });

      return response.data;
    } catch (e) {
      throw e;
    }
  };
}

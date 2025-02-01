import { IPopulationEntity } from "../entities/population.entity";

export interface ILoadPopulationUseCase {
  handle: () => Promise<IPopulationEntity[]>;
}

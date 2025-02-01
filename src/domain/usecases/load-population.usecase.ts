import { IPopulationEntity } from "../entities/Population.entity";

export interface ILoadPopulationUseCase {
  handle: () => Promise<IPopulationEntity[]>;
}

import { IGeojsonEntity } from "../entities/Geojson.entity";

export interface ILoadGeojsonUseCase {
  handle: () => Promise<IGeojsonEntity>;
}

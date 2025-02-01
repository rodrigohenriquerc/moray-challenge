import { IGeojsonEntity } from "../entities/geojson.entity";

export interface ILoadGeojsonUseCase {
  handle: () => Promise<IGeojsonEntity>;
}

import { useEffect, useMemo, useState } from "react";
import { makeLoadNeightborhoods } from "./factories/load-neighborhoods.factory";
import { IGeojsonEntity } from "./domain/entities/geojson.entity";
import { IPopulationEntity } from "./domain/entities/population.entity";
import { ILoadNeighborhoodsUseCase } from "./domain/usecases/load-neighbordhoods.usecase";
import { makeLoadGeojson } from "./factories/load-geojson.factory";
import { makeLoadPopulation } from "./factories/load-population.factory";

const loadNeighborhoods = makeLoadNeightborhoods();
const loadGeojson = makeLoadGeojson();
const loadPopulation = makeLoadPopulation();

export const useNeighborhoods = () => {
  const [geojson, setGeojson] = useState<IGeojsonEntity | null>(null);
  const [population, setPopulation] = useState<IPopulationEntity[]>([]);
  const [status, setStatus] = useState<
    ILoadNeighborhoodsUseCase.TStatus | "loading"
  >("loading");

  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<
    number | null
  >(null);

  const selectNeighborhood = (id: number) => {
    setSelectedNeighborhoodId(id);
  };

  const selectedNeighborhood = useMemo(() => {
    if (!geojson) return null;

    return {
      name:
        geojson.features.find(
          (feature) => feature.properties.id === selectedNeighborhoodId
        )?.properties.name || "",
      population: population.filter(
        ({ id_geometria }) => id_geometria === selectedNeighborhoodId
      ),
    };
  }, [geojson, population, selectedNeighborhoodId]);

  const loadAll = async () => {
    setStatus("loading");
    const response = await loadNeighborhoods.handle();
    setGeojson(response.geojson.data);
    setPopulation(response.population.data);
    setStatus(response.status);
  };

  const loadOnlyGeojson = async () => {
    setStatus("loading");
    try {
      const data = await loadGeojson.handle();
      setGeojson(data);
      setStatus("success");
    } catch {
      setStatus("geojson_failed");
    }
  };

  const loadOnlyPopulation = async () => {
    setStatus("loading");
    try {
      const data = await loadPopulation.handle();
      setPopulation(data);
      setStatus("success");
    } catch {
      setStatus("population_failed");
    }
  };

  const retry = () => {
    const method_by_status: Record<
      Exclude<ILoadNeighborhoodsUseCase.TStatus, "success">,
      () => {}
    > = {
      both_failed: loadAll,
      geojson_failed: loadOnlyGeojson,
      population_failed: loadOnlyPopulation,
    };

    if (status !== "success" && status !== "loading") {
      method_by_status[status]();
    }
  };

  const isFailure = status.includes("failed");

  useEffect(() => {
    loadAll();
  }, []);

  return {
    geojson,
    population,
    status,
    retry,
    isFailure,
    selectNeighborhood,
    selectedNeighborhood,
  };
};

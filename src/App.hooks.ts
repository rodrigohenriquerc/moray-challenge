import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { IGeojson, IPopulation } from "./App.types";

export const useNeighborhoods = () => {
  const [geojson, setGeojson] = useState<IGeojson | null>(null);
  const [population, setPopulation] = useState<IPopulation[]>([]);
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

  useEffect(() => {
    const fetchGeojson = async () => {
      const resp = await axios.get<IGeojson>("/bairros-geojson");
      setGeojson(resp.data);
    };

    const fetchPopulation = async () => {
      const resp = await axios.get<IPopulation[]>("/populacao");
      setPopulation(resp.data);
    };

    fetchGeojson();
    fetchPopulation();
  }, []);

  return { geojson, selectNeighborhood, selectedNeighborhood };
};

import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export const useNeighborhoods = () => {
  const [geojson, setGeojson] = useState(null);
  const [population, setPopulation] = useState([]);
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState(null);

  const selectNeighborhood = (id) => {
    setSelectedNeighborhoodId(id);
  };

  const selectedNeighborhood = useMemo(() => {
    if (!geojson) return null;

    return {
      name: geojson.features.find(
        (feature) => feature.properties.id === selectedNeighborhoodId
      )?.properties.name,
      population: population.filter(
        ({ id_geometria }) => id_geometria === selectedNeighborhoodId
      ),
    };
  }, [geojson, population, selectedNeighborhoodId]);

  useEffect(() => {
    const fetchGeojson = async () => {
      const resp = await axios.get("/bairros-geojson");
      setGeojson(resp.data);
    };

    const fetchPopulation = async () => {
      const resp = await axios.get("/populacao");
      setPopulation(resp.data);
    };

    fetchGeojson();
    fetchPopulation();
  }, []);

  return { geojson, selectNeighborhood, selectedNeighborhood };
};

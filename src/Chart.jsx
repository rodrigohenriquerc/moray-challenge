/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ({ neighborhood }) => {
  const labels = useMemo(
    () => neighborhood.population.map(({ ano }) => ano),
    [neighborhood.population]
  );

  const data = useMemo(
    () => neighborhood.population.map(({ populacao }) => populacao),
    [neighborhood.population]
  );

  return (
    <Bar
      options={{
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: neighborhood.name,
          },
        },
        aspectRatio: 1,
      }}
      data={{
        labels,
        datasets: [
          {
            label: "População",
            data,
            backgroundColor: "#38C58B",
          },
        ],
      }}
      updateMode="show"
    />
  );
};

import React from "react";
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
import { IPopulation } from "./App.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  name: string;
  population: IPopulation[];
}

export const Chart: React.FC<IProps> = ({ name, population }) => {
  const labels = useMemo(() => population.map(({ ano }) => ano), [population]);

  const data = useMemo(
    () => population.map(({ populacao }) => populacao),
    [population]
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
            text: name,
          },
        },
        aspectRatio: 1,
        locale: "pt-BR",
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

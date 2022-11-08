import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { type } from "os";
import useWindowSize from "../../Hooks/WindowSize";

interface GroupStats {
  groupName: string;
  kills: number;
  alive: number;
  total: number;
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const optionsAlive = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Antal levand i klasserna",
    },
  },
  maintainAspectRation: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        autoSkip: false,
      },
    },
    y: {
      stacked: true,
    },
  },
};

const optionsKills = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Kills",
    },
  },
  maintainAspectRation: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        autoSkip: false,
      },
    },
    y: {
      stacked: true,
    },
  },
};

function Stats() {
  const size = useWindowSize();
  const [groups, setGroups] = useState<GroupStats[]>([
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
    {
      alive: 5,
      groupName: "Na21B",
      kills: 25,
      total: 25,
    },
    {
      alive: 15,
      groupName: "Na21A",
      kills: 10,
      total: 20,
    },
  ]);

  return (
    <div style={{ width: size.width < 800 ? "95vw" : 500 }}>
      <Bar
        height={size.width < 800 ? 800 : 300}
        options={optionsAlive}
        data={{
          labels: groups.map((i) => i.groupName),
          datasets: [
            {
              label: "Döda",
              data: groups.map((i) => i.total - i.alive),
              backgroundColor: "rgba(225, 77, 42, 0.3)",
              stack: "Stack 0",
            },
            {
              label: "Levande",
              data: groups.map((i) => i.alive),
              backgroundColor: "rgba(130, 205, 71, 0.3)",
              stack: "Stack 0",
            },
          ],
        }}
      />
      <Bar
        height={size.width < 800 ? 800 : 300}
        options={optionsKills}
        data={{
          labels: groups.map((i) => i.groupName),
          datasets: [
            {
              label: "Kills",
              data: groups.map((i) => i.kills),
              backgroundColor: "rgba(98, 79, 130, 0.3)",
              stack: "Stack 0",
            },
          ],
        }}
      />
      {groups.map((group, index) => {
        return (
          <Pie
            key={index}
            options={{
              plugins: {
                title: {
                  text: `${group.groupName}`,
                  display: true,
                },
              },
              color: "rgba(0,0,0,1)",
            }}
            data={{
              labels: ["Levande", "Döda"],
              datasets: [
                {
                  label: "Antal levande",
                  data: [group.alive, group.total - group.alive],
                  backgroundColor: [
                    "rgba(130, 205, 71, 0.3)",
                    "rgba(225, 77, 42, 0.3)",
                  ],
                  borderColor: [
                    "rgba(130, 205, 71, 0.5)",
                    "rgba(225, 77, 42, 0.5)",
                  ],
                },
              ],
            }}
          />
        );
      })}
    </div>
  );
}

export default Stats;

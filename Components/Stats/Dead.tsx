import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import useWindowSize from "../../Hooks/WindowSize";
import { GroupStats, KillerUser } from "../../Interfaces/Interfaces";
import { optionsKills } from "../../pages/stats";

interface Props {
  groups: GroupStats[];
  kills: KillerUser[];
  days: { killsAlive: number; killsDead: number; day: number; month: number }[];
  setGroup: (group: GroupStats) => void;
  selectedGroup: GroupStats;
}

function Dead({ groups, kills, days, setGroup, selectedGroup }: Props) {
  const size = useWindowSize();
  console.log(kills);
  return (
    <div>
      <h3
        style={{
          color: "var(--main-green)",
          textAlign: "center",
        }}
      >
        De Dödas Cirkel
      </h3>
      <h1
        style={{
          color: "var(--main-green)",
          textAlign: "center",
        }}
      >
        Människor att mörda:{" "}
        {groups[0].totalAlive - groups[0].aliveAlive - kills.length - 1}
      </h1>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Kills per dag",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (i: any) => {
                  if (i % 1 === 0) {
                    return i;
                  }
                  return undefined;
                },
              },
            },
          },
        }}
        data={{
          labels: days
            .filter((i) => i.killsDead > 0)
            .map((i) => {
              return `${i.day}/${i.month}`;
            }),

          datasets: [
            {
              label: "Kills",
              borderColor: "rgba(225, 77, 42, 0.3)",
              backgroundColor: "rgba(225, 77, 42, 0.6)",
              data: days
                .filter((i) => i.killsDead > 0)
                .map((day) => day.killsDead),
            },
          ],
        }}
      />
      {kills.length > 0 && (
        <Bar
          height={size.width < 800 ? 800 : 300}
          options={optionsKills}
          data={{
            labels: kills.filter((i) => i.kills > 0).map((i) => i.name),
            datasets: [
              {
                label: "Kills",
                data: kills.filter((i) => i.kills > 0).map((i) => i.kills),
                backgroundColor: "rgba(98, 79, 130, 0.3)",
                stack: "Stack 0",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default Dead;

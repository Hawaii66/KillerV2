import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import useWindowSize from "../../Hooks/WindowSize";
import { GroupStats, KillerUser } from "../../Interfaces/Interfaces";
import { optionsKills, optionsAlive } from "../../pages/stats";
import styles from "./stats.module.css";

interface Props {
  groups: GroupStats[];
  kills: KillerUser[];
  days: { killsAlive: number; killsDead: number; day: number; month: number }[];
  setGroup: (group: GroupStats) => void;
  selectedGroup: GroupStats;
}

function Killer({ groups, kills, days, setGroup, selectedGroup }: Props) {
  const size = useWindowSize();
  return (
    <>
      <h3
        style={{
          color: "var(--main-green)",
          textAlign: "center",
        }}
      >
        Killer 2022
      </h3>
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
            .filter((i) => i.killsAlive > 0)
            .map((i) => {
              return `${i.day}/${i.month}`;
            }),

          datasets: [
            {
              label: "Kills",
              borderColor: "rgba(225, 77, 42, 0.3)",
              backgroundColor: "rgba(225, 77, 42, 0.6)",
              data: days
                .filter((i) => i.killsAlive > 0)
                .map((day) => day.killsAlive),
            },
          ],
        }}
      />
      {kills.length > 0 && (
        <Bar
          height={size.width < 800 ? 800 : 300}
          options={optionsKills}
          data={{
            labels: kills.map((i) => i.name),
            datasets: [
              {
                label: "Kills",
                data: kills.map((i) => i.kills),
                backgroundColor: "rgba(98, 79, 130, 0.3)",
                stack: "Stack 0",
              },
            ],
          }}
        />
      )}
      <Bar
        height={size.width < 800 ? 800 : 300}
        options={optionsAlive}
        data={{
          labels: groups.slice(1, groups.length).map((i) => i.groupName),
          datasets: [
            {
              label: "Levande",
              data: groups.slice(1, groups.length).map((i) => i.aliveAlive),
              backgroundColor: "rgba(130, 205, 71, 0.3)",
              stack: "Stack 0",
            },
            {
              label: "Döda",
              data: groups
                .slice(1, groups.length)
                .map((i) => i.totalAlive - i.aliveAlive),
              backgroundColor: "rgba(225, 77, 42, 0.3)",
              stack: "Stack 0",
            },
          ],
        }}
      />
      <Bar
        height={size.width < 800 ? 800 : 300}
        options={optionsKills}
        data={{
          labels: groups.slice(1, groups.length).map((i) => i.groupName),
          datasets: [
            {
              label: "Kills",
              data: groups.slice(1, groups.length).map((i) => i.killsAlive),
              backgroundColor: "rgba(98, 79, 130, 0.3)",
              stack: "Stack 0",
            },
          ],
        }}
      />
      <div className={styles.wrapper}>
        <select
          onChange={(e) => {
            const g = groups.find((i) => i.groupName === e.target.value);
            if (g === undefined) {
              return;
            }

            setGroup(g);
          }}
        >
          {groups.map((group) => {
            return (
              <option key={group.groupName} value={group.groupName}>
                {group.groupName}
              </option>
            );
          })}
        </select>
      </div>
      {selectedGroup.groupName !== "" && (
        <Pie
          options={{
            color: "rgba(0,0,0,1)",
          }}
          data={{
            labels: [
              `Levande: ${selectedGroup.aliveAlive}`,
              `Döda: ${selectedGroup.totalAlive - selectedGroup.aliveAlive}`,
            ],
            datasets: [
              {
                label: "Antal levande",
                data: [
                  selectedGroup.aliveAlive,
                  selectedGroup.totalAlive - selectedGroup.aliveAlive,
                ],
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
      )}
    </>
  );
}

export default Killer;

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
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import useWindowSize from "../../Hooks/WindowSize";
import { connect, dbs } from "../../utils/DBConnection";
import { ConfirmedKill, KillerUser } from "../../Interfaces/Interfaces";
import styles from "./stats.module.css";

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
  ArcElement,
  PointElement,
  LineElement
);

const optionsAlive = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Klicka på de färgade rutorna för att gömma en färg",
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

function Stats({
  groups,
  kills,
  days,
}: {
  groups: GroupStats[];
  kills: KillerUser[];
  days: { kills: number; day: number; month: number }[];
}) {
  const size = useWindowSize();
  const [selectedGroup, setSelected] = useState<GroupStats>(groups[0]);

  return (
    <div style={{ width: size.width < 800 ? "95vw" : 500 }}>
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
          labels: days.map((i) => {
            return `${i.day}/${i.month}`;
          }),

          datasets: [
            {
              label: "Kills",
              borderColor: "rgba(225, 77, 42, 0.3)",
              backgroundColor: "rgba(225, 77, 42, 0.6)",
              data: days.map((day) => day.kills),
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
              data: groups.slice(1, groups.length).map((i) => i.alive),
              backgroundColor: "rgba(130, 205, 71, 0.3)",
              stack: "Stack 0",
            },
            {
              label: "Döda",
              data: groups
                .slice(1, groups.length)
                .map((i) => i.total - i.alive),
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
              data: groups.slice(1, groups.length).map((i) => i.kills),
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

            setSelected(g);
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
              `Levande: ${selectedGroup.alive}`,
              `Döda: ${selectedGroup.total - selectedGroup.alive}`,
            ],
            datasets: [
              {
                label: "Antal levande",
                data: [
                  selectedGroup.alive,
                  selectedGroup.total - selectedGroup.alive,
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
    </div>
  );
}

export async function getServerSideProps() {
  await connect();
  const users: KillerUser[] = await dbs.users.find();

  var groups: { [key: string]: GroupStats } = {};
  users.forEach((user) => {
    if (groups[user.group] === undefined) {
      groups[user.group] = {
        alive: 0,
        groupName: user.group,
        kills: 0,
        total: 0,
      };
    }
    groups[user.group].alive += user.alive ? 1 : 0;
    groups[user.group].kills += user.kills;
    groups[user.group].total += 1;
    groups[user.group].groupName = user.group;
  });

  const mostKills = [...users].sort((a, b) => b.kills - a.kills);

  var finals: GroupStats[] = [];
  for (const [_, value] of Object.entries(groups)) {
    finals.push(value);
  }

  finals.sort((a, b) => {
    return a.groupName.localeCompare(b.groupName);
  });

  for (var i = 0; i < finals.length; i++) {
    if (finals[i].groupName === "Lärare") {
      finals.push({ ...finals[i] });
      finals.splice(i, 1);
    }
  }

  finals = [
    {
      alive: users.filter((a) => a.alive).length,
      groupName: "Alla",
      kills: 0,
      total: users.length,
    },
    ...finals,
  ];

  const killsEveryDay: {
    [key: number]: { kills: number; day: number; month: number };
  } = {};

  const allKills = await dbs.confirmed.find();
  allKills.sort((a, b) => a.time - b.time);
  allKills.forEach((confirmed: ConfirmedKill) => {
    const time = new Date(confirmed.time);

    const key = time.getMonth() * 1000 + time.getDate();
    if (killsEveryDay[key] === undefined) {
      killsEveryDay[key] = {
        day: time.getDate(),
        kills: 1,
        month: time.getMonth(),
      };
    } else {
      killsEveryDay[key].kills += 1;
    }
  });
  var finalDays = [];
  for (const [_, value] of Object.entries(killsEveryDay)) {
    finalDays.push(value);
  }

  return {
    props: {
      groups: finals,
      kills: [...mostKills.splice(0, 10)]
        .filter((i) => i.kills > 0)
        .map((i) => {
          return {
            name: i.name,
            kills: i.kills,
          };
        }),
      days: finalDays,
    },
  };
}

export default Stats;

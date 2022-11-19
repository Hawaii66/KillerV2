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
import useWindowSize from "../../Hooks/WindowSize";
import { connect, dbs } from "../../utils/DBConnection";
import {
  ConfirmedKill,
  GroupStats,
  KillerUser,
} from "../../Interfaces/Interfaces";
import Killer from "../../Components/Stats/Killer";
import Dead from "../../Components/Stats/Dead";
import Button from "../../Components/Utils/Button/Button";

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

export const optionsAlive = {
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

export const optionsKills = {
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
  killsDead,
}: {
  groups: GroupStats[];
  kills: KillerUser[];
  killsDead: KillerUser[];
  days: { killsAlive: number; killsDead: number; day: number; month: number }[];
}) {
  const size = useWindowSize();
  const [selectedGroup, setSelected] = useState<GroupStats>(groups[0]);
  const [isAliveGroup, setGroup] = useState(true);

  return (
    <div style={{ width: size.width < 800 ? "95vw" : 500 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setGroup((g) => !g)}>Byt Statistik</Button>
      </div>
      {isAliveGroup ? (
        <Killer
          days={days}
          groups={groups}
          kills={kills}
          selectedGroup={selectedGroup}
          setGroup={(s) => setSelected(s)}
        />
      ) : (
        <Dead
          days={days}
          groups={groups}
          kills={killsDead}
          selectedGroup={groups[0]}
          setGroup={(s) => setSelected(s)}
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
        aliveAlive: 0,
        aliveDead: 0,
        groupName: user.group,
        killsAlive: 0,
        killsDead: 0,
        totalAlive: 0,
      };
    }
    groups[user.group].aliveAlive += user.alive === "Alive" ? 1 : 0;
    groups[user.group].aliveDead += user.alive === "Dead" ? 1 : 0;
    groups[user.group].killsAlive += user.alive === "Alive" ? user.kills : 0;
    groups[user.group].killsDead += user.alive === "Dead" ? user.killsDead : 0;
    groups[user.group].totalAlive += 1;
    groups[user.group].groupName = user.group;
  });

  const mostKills = [...users].sort((a, b) => b.kills - a.kills);
  const mostKillsDead = [...users].sort((a, b) => b.killsDead - a.killsDead);

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
      aliveAlive: users.filter((a) => a.alive === "Alive").length,
      aliveDead: 0,
      groupName: "Alla",
      killsAlive: 15,
      killsDead: 0,
      totalAlive: users.length,
    },
    ...finals,
  ];

  const killsEveryDay: {
    [key: number]: {
      killsAlive: number;
      killsDead: number;
      day: number;
      month: number;
    };
  } = {};

  const allKills = await dbs.confirmed.find();
  allKills.sort((a, b) => a.time - b.time);
  allKills.forEach((confirmed: ConfirmedKill) => {
    const time = new Date(confirmed.time);
    if (confirmed.circle === undefined) {
      confirmed.circle = "Alive";
    }

    const key = time.getMonth() * 1000 + time.getDate();
    if (killsEveryDay[key] === undefined) {
      killsEveryDay[key] = {
        day: time.getDate(),
        killsAlive: confirmed.circle === "Alive" ? 1 : 0,
        killsDead: confirmed.circle === "Dead" ? 1 : 0,
        month: time.getMonth(),
      };
    } else {
      killsEveryDay[key].killsAlive += confirmed.circle === "Alive" ? 1 : 0;
      killsEveryDay[key].killsDead += confirmed.circle === "Dead" ? 1 : 0;
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
      killsDead: [...mostKillsDead.splice(0, 5)]
        .filter((i) => i.killsDead > 0)
        .map((i) => {
          return {
            name: i.name,
            kills: i.killsDead,
          };
        }),
      days: finalDays,
    },
  };
}

export default Stats;

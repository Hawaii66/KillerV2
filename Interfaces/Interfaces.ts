export type Circle = "None" | "Dead" | "Alive";

export interface RuleInfo {
  data: React.ReactNode;
  title: string;
}

export interface KillerUser {
  id: number;
  name: string;
  target: number;
  schoolEmail: string;
  email: string;
  group: string;
  phone: string;
  member: boolean;
  alive: Circle;
  kills: number;
  killsDead: number;
}

export interface HomeInfo {
  title: string;
  miniHeader?: string;
  imageUrl: string;
  text?: string;
  id: string;
}

export interface ConfirmedKill {
  murder: string;
  target: string;
  time: number;
  circle: Circle;
}

export interface GroupStats {
  groupName: string;
  killsAlive: number;
  killsDead: number;
  aliveAlive: number;
  aliveDead: number;
  totalAlive: number;
}

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
  alive: boolean;
  kills: number;
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
}

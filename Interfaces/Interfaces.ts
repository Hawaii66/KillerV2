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

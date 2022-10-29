export interface RuleInfo {
  data: React.ReactNode;
  title: string;
}

export interface KillerUser {
  id: number;
  name: string;
  target: number;
  email: string;
  group: string;
  phone: string;
  member: boolean;
  alive: boolean;
}

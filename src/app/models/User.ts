export interface User {
  name: string;
  token?: string;
  id: number;
  username: string;
  password: string;
  code: number;
  gender: string;
  status: string;
  maintype: {
    name: string;
  };
}

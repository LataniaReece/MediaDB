export interface User {
  id: number | null;
  name: string;
  isAdmin: boolean;
}

export default interface AppContextInterface {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

import { User } from "../models/user";

export const getUserStatus = (): User | null => {
  if(!isClientSide()) return null;
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user) as User;
  return null;
};

export const saveAuthStateInLocalStorage = (user: User): void => {
  if(!isClientSide()) return;
  localStorage.setItem("user", JSON.stringify(user));
};

export const logOut = (): void => {
  if(!isClientSide()) return;
  localStorage.removeItem("user");
};


const isClientSide = (): boolean => {
  return typeof window !== 'undefined';
}
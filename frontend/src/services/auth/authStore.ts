import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type authProps = {
  email: string;
  password: string;
};

type Auth = {
  auth: authProps[] | [];
};

const useAuth = create<Auth>()(
  devtools((set) => ({
    auth: [
      {
        email: "",
        password: "",
      },
    ],
  }))
);

export default useAuth;

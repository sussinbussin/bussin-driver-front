import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useUserApi = (token) => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const getUser = async (email) => {
    let data = null;
    try {
      const res = await api.get(`users/byEmail/${email}`);
      data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const createUser = async (user) => {
    let data = null;
    try {
      const res = await api.post("users/wCognito/create", {
        json: user,
      });
      data = await res.json();
      return data;
    } catch (error) {
      return;
    }
  };

  return { getUser, createUser };
};

export { useUserApi };
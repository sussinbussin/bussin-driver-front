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
    console.log(email);
    let data = null;
    try {
      const res = await api.get(`users/byEmail/${email}`);
      data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return data;
    }
  };

  const getFullUserByUuid = async (uuid) => {
    let data = null;
    try {
      const res = await api.get(`users/full/${uuid}`);
      data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getUserByUuid = async (uuid) => {
    let data = null;
    try {
      const res = await api.get(`users/${uuid}`);
      data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const createUser = async (user) => {
    let data = null;
    try {
      const res = await api.post("users/wCognito/create", { json: user });
      data = await res.json();
      return data;
    } catch (error) {
      return;
    }
  };

  const updateUser = async (userId, userDTO) => {
    let data = null;
    try {
      const res = await api.put(`users/${userId}`, {
        json: userDTO,
      });
      data = await res.json();
      return data;
    } catch (error) {
      return;
    }
  };

  return { getUser, createUser, getFullUserByUuid, getUserByUuid, updateUser};
};

export { useUserApi };

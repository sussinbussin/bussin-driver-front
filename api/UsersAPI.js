import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";
import jwtDecode from "jwt-decode";

const useUserAPI = (token, email) => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const getUser = async () => {
    let data = null;
    try {
      const res = await api.get(`users/byEmail/${email}`);
      data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return;
    }
  };

  return { getUser };
};

export { useUserAPI };

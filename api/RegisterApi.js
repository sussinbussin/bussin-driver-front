import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useRegisterApi = () => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
  });

  const register = async (form) => {
    let result = null;
    try {
      const res = await api.post("users/wCognito/create", {
        json: form,
      });

      result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
      return result;
    }
  };

  const check = async (form) => {
    let result = null;
    try {
      const res = await api.post("unique", {
        json: form,
      });
      result = await res.json();
      return result;
    } catch (error) {
      console.error(error);
      return result;
    }
  };

  return { register, check };
};

export { useRegisterApi };

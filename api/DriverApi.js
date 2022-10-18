import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useDriverApi = (token) => {
    const api = ky.create({
        prefixUrl: BACKEND_API_ENDPOINT,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    const getDriverByCarPlate = async (carPlate) => {
        let data = null;
        try {
          const res = await api.get(`driver/${carPlate}`);
          data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
          return;
        }
    }

    return { getDriverByCarPlate };
}

export { useDriverApi };
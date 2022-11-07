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
          return data;
        }
    }

    const updateDriver = async (carPlate, driverDTO) => {
        let data = null;
        try {
            const res = await api.put(`driver/${carPlate}`, {
              json: driverDTO,
            });
            data = await res.json();
            console.log(data);
            return data;
          } catch (error) {
            return;
          }
    }

    const createDriver = async (uuid, driverDTO) => {
      let data = null;
      try {
          const res = await api.post(`driver/${uuid}`, {json: driverDTO});
          data = await res.json();
          console.log(data);
          return data;
      } catch (error) {
          return;
      }
  };

    return { getDriverByCarPlate, updateDriver, createDriver };
}

export { useDriverApi };

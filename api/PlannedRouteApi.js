import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const usePlannedRouteApi = (token) => {
    const api = ky.create({
        prefixUrl: BACKEND_API_ENDPOINT,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    const getPlannedRoutes = async (carPlate) => {
        console.log()
        let data = null;
        try {
          const res = await api.get(`driver/${carPlate}/plannedRoutes`);
          data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
          return;
        }
    }

    const createPlannedRoute = async (plannedRouteDTO, carPlate) => {
        console.log()
        let data = null;
        try {
            const res = await api.post(`planned/${carPlate}`, {
                json: plannedRouteDTO,
            });
            data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            return;
        }
    }

    const updatePlannedRoute = async (plannedRouteDTO) => {
        let data = null;
        try {
            const res = await api.put(`planned/${plannedRouteDTO.id}`, {
               json: plannedRouteDTO,
            });
            data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            return;
        }
    }

    const deletePlannedRoute = async (routeId) => {
        let data = null;
        try {
            const res = await api.post(`planned/${routeId}`);
            data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            return;
        }
    };

    return { getPlannedRoutes, createPlannedRoute, updatePlannedRoute, deletePlannedRoute };
}

export { usePlannedRouteApi };
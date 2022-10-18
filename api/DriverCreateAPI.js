import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useCreateDriverAPI = (token, uuid, driverDTO) => {
    const api = ky.create({
        prefixUrl: BACKEND_API_ENDPOINT,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    const createDriver = async () => {
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

    return { createDriver };
};

export { useCreateDriverAPI };
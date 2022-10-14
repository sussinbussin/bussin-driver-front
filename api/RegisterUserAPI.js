import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useRegisterUserAPI = (userCreationDTO) => {
    const api = ky.create({
        prefixUrl: BACKEND_API_ENDPOINT,
      });

    const createUser = async () => {
        let data = null;
        try {
            const res = await api.post(`users/wCognito/create`);
            data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            return;
        }
    };

    return { getUser };
};

export { useRegisterUserAPI };
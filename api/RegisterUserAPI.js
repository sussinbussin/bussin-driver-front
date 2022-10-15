import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useRegisterUserAPI = () => {
    const api = ky.create({
        prefixUrl: BACKEND_API_ENDPOINT,
      });

    const createUser = async (userCreationDTO) => {
        let data = null;
        try {
            const data = await api.post(`users/wCognito/create`, {json: userCreationDTO}).json();
            console.log("Resulting user: ")
            console.log(data);
            return data;
        } catch (error) {
            console.log(error)
            return;
        }
    };

    return { createUser };
};

export { useRegisterUserAPI };
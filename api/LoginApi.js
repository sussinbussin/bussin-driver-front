import { COGNITO_ENDPOINT, COGNITO_CLIENTID } from "@env";
import ky from "ky";

const api = ky.create({
  prefixUrl: COGNITO_ENDPOINT,
});

const useLoginAPI = (username, password) => {
  const loginUser = async () => {
    let data = null;

    try {
      const res = await api.post("", {
        json: {
          AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
          },
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: COGNITO_CLIENTID,
        },
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          "Content-Type": "application/x-amz-json-1.1",
        },
      });
      if (!res.ok){
        return {error: true}
      }
      data = await res.json();
      //TODO: error handling
      return data;
    } catch (error) {
      return {error: true}
    }

  };
    return { loginUser };
};

export { useLoginAPI };

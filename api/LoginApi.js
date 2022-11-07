import { COGNITO_ENDPOINT, COGNITO_CLIENTID } from "@env";
import ky from "ky";
import jwtDecode from "jwt-decode";

const api = ky.create({
  prefixUrl: COGNITO_ENDPOINT,
});

const useLoginApi = (username, password) => {
  const loginUser = async () => {
    let token = null;
    let email = null;
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
      const result = await res.json();
      token = result.AuthenticationResult.IdToken;
      let decodeToken = jwtDecode(token);
      email = decodeToken.email;

      return { token, email };
    } catch (error) {
      console.log(error);
      return { token, email };
    }
  };
  return { loginUser };
};

export { useLoginApi };

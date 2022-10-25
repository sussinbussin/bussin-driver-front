import { COGNITO_ENDPOINT, COGNITO_CLIENTID } from "@env";
import ky from "ky";
import jwtDecode from "jwt-decode";

const api = ky.create({
  prefixUrl: COGNITO_ENDPOINT,
});

const useLoginApi = (username, password) => {
  const loginUser = async () => {
    let token = null;
    let error = false;
    try {
      console.log(username + password);
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
      }).json();
      token = await res;

      let authToken = token.AuthenticationResult.IdToken;
      let decodeToken = jwtDecode(authToken);
      let email = decodeToken.email;

      console.log(email)
      return { authToken, email };
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return { loginUser };
};

export { useLoginApi };

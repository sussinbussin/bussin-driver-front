import { COGNITO_ENDPOINT, COGNITO_CLIENTID } from "@env";
import ky from "ky";
import jwtDecode from "jwt-decode";

const api = ky.create({
  prefixUrl: COGNITO_ENDPOINT,
});

/*
 * We are doing it this way because we to conform it to a hook
 * matt follows this because he dk what to do albeit a bit lost
 * */
const useLoginAPI = (username, password) => {
  const loginUser = async () => {
    let token = null;
    let error = false;
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
      token = await res.json();
      //TODO: data validation and error handling
      //this is dumb
      let authToken = token.AuthenticationResult.IdToken;
      let decodeToken = jwtDecode(authToken);
      let email = decodeToken.email;

      return { token, email };
    } catch (error) {
      return;
    }
  };
  return { loginUser };
};

export { useLoginAPI };

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { cognitoPool } from "./CognitoPool";

const useLoginApi = (username, password, callBack) => {
  const loginUser = async () => {
    let error = false;
    console.log("Attempting to login in with " + username + password);
    try {
      const user = new CognitoUser({
        Username: username,
        Pool: cognitoPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: async (res) => {
          let authToken = res.idToken.jwtToken;
          let email = res.idToken.payload.email;
          callBack(authToken, email);
        },

        onFailure: (err) => {
          return err;
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  return { loginUser };
};

export { useLoginApi };

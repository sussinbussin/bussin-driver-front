import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useState } from "react";
import { cognitoPool } from "./CognitoPool";

const useLoginApi = (username, password) => {
  const [token, setToken] = useState("");

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
          setToken(res);
          console.log("Set the token");
        },

        onFailure: (err) => {
          console.log(err);
          switch (err.name) {
            case "UserNotConfirmedException":
              return Alert.alert(General.Error, Auth.UserNotConfirmed);
            case "NotAuthorizedException":
              return Alert.alert(General.Error, Auth.IncorrectCredentials);
            default:
              return Alert.alert(General.Error, General.SomethingWentWrong);
          }
        },
      });

      function pause() {
        return new Promise((res) => {
          setTimeout(() => {
            res();
          }, 1000);
        });
      }
      await pause();
      console.log("Result: " + token);
      let authToken = token.idToken.jwtToken;
      let email = token.idToken.payload.email;

      return { authToken, email };
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return { loginUser };
};

export { useLoginApi };

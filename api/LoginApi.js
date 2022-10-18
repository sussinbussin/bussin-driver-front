import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useState } from "react";
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
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return { loginUser };
};

export { useLoginApi };

import {CognitoUserPool} from 'amazon-cognito-identity-js';
import { COGNITO_POOLID, COGNITO_CLIENTID } from "@env";

const poolData = {
  UserPoolId: COGNITO_POOLID,
  ClientId: COGNITO_CLIENTID,
};
export const cognitoPool = new CognitoUserPool(poolData);
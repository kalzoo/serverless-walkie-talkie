import AWSAppSyncClient from "aws-appsync";
import { Auth } from "aws-amplify";
// import localForage from 'localforage';

// From here. Thanks C.Lee!
// https://stackoverflow.com/questions/52960709/how-to-use-apollo-client-with-appsync

const client = new AWSAppSyncClient({
  url:
    "https://i7fjrf53b5godjbtq7xge7cwgm.appsync-api.us-east-1.amazonaws.com/graphql",
  region: "us-east-1",
  auth: {
    type: "AMAZON_COGNITO_USER_POOLS",
    jwtToken: async () => {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      return token;
    }
  },
  disableOffline: true
});

export default client;

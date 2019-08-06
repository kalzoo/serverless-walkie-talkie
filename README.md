# Serverless Walkie Talkie Demo Application

Do you like [Discord](https://discordapp.com/) and [Zello](https://zello.com/), but find that they're too free, easy, and reliable for you? Are you the DIY kind of person, and want to build and run your own voice chat server? This is the workshop for you.

This is the example repo for the workshop posted on [Medium](https://medium.com) and [kalan.io](https://kalan.io/posts/serverless-walkie-talkie).

The workshop covers:

- How to quickly get infrastructure up and running with AWS CDK
- How to configure an AppSync schema, resolvers, and data sources without using the AWS Console
- How to use Cognito for AppSync authentication & authorization
- How to configure a brand-new React application using AWS Amplify and pre-existing AWS resources
- How to record, process, and play audio data in the browser, sending it to and receiving it from AppSync
- How to integrate ApolloClient with AppSync GraphQL subscriptions

The end product is a voice chat application, where authenticated users can join one of a number of rooms and "push to talk," trading voice messages with other users in that room.
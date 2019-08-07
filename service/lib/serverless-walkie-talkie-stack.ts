import cdk = require("@aws-cdk/core");
import appsync = require("@aws-cdk/aws-appsync");
import cognito = require("@aws-cdk/aws-cognito");
import dynamo = require("@aws-cdk/aws-dynamodb");
import iam = require("@aws-cdk/aws-iam");

import fs = require("fs");
import path = require("path");

import {
  request as createAudioSegmentRequest,
  response as createAudioSegmentResponse
} from "../src/resolverMappings/createAudioSegment";

import {
  request as roomsRequest,
  response as roomsResponse
} from "../src/resolverMappings/rooms";

const ensureString = (value: any) => {
  if (typeof value === "string") {
    return value;
  } else {
    return JSON.stringify(value, null, 2);
  }
};

export class ServerlessWalkieTalkieStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const applicationName = "serverless-walkie-talkie";

    const userPool = new cognito.UserPool(this, "UserPool", {
      autoVerifiedAttributes: [cognito.UserPoolAttribute.EMAIL]
    });

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool
    });

    const roomTable = new dynamo.Table(this, "RoomTable", {
      partitionKey: {
        name: "id",
        type: dynamo.AttributeType.STRING
      },
      readCapacity: 5,
      writeCapacity: 1,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const dynamoRole = new iam.LazyRole(this, "AppsyncDynamoRole", {
      assumedBy: new iam.ServicePrincipal("appsync.amazonaws.com"),
      roleName: `${applicationName}-appsync-dynamo-role`,
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess")
      ]
    });

    const appsyncApi = new appsync.CfnGraphQLApi(this, "AppSyncApi", {
      name: `${applicationName}-api`,
      authenticationType: "AMAZON_COGNITO_USER_POOLS",
      userPoolConfig: {
        appIdClientRegex: ".*",
        awsRegion: cdk.Stack.of(this).region,
        defaultAction: "ALLOW",
        userPoolId: userPool.userPoolId
      }
    });

    const appsyncSchema = new appsync.CfnGraphQLSchema(this, "AppSyncSchema", {
      apiId: appsyncApi.attrApiId,
      definition: fs
        .readFileSync(path.join(__dirname, "../src/schema.graphql"))
        .toString()
    });

    const audioSegmentDataSource = new appsync.CfnDataSource(
      this,
      "AudioSegmentDataSource",
      {
        apiId: appsyncApi.attrApiId,
        name: "AudioSegmentDataSource",
        type: "NONE"
      }
    );

    audioSegmentDataSource.addDependsOn(appsyncSchema);

    const roomDataSource = new appsync.CfnDataSource(this, "RoomDataSource", {
      apiId: appsyncApi.attrApiId,
      name: "RoomDataSource",
      type: "AMAZON_DYNAMODB",
      serviceRoleArn: dynamoRole.roleArn,
      dynamoDbConfig: {
        awsRegion: "us-east-1",
        tableName: roomTable.tableName,
        useCallerCredentials: false
      }
    });

    roomDataSource.addDependsOn(appsyncSchema);

    new appsync.CfnResolver(this, "ResolverRooms", {
      apiId: appsyncApi.attrApiId,
      dataSourceName: roomDataSource.name,
      fieldName: "rooms",
      requestMappingTemplate: ensureString(roomsRequest),
      responseMappingTemplate: ensureString(roomsResponse),
      typeName: "Query"
    }).addDependsOn(roomDataSource);

    new appsync.CfnResolver(this, "ResolverCreateAudioSegment", {
      apiId: appsyncApi.attrApiId,
      dataSourceName: audioSegmentDataSource.name,
      fieldName: "createAudioSegment",
      requestMappingTemplate: ensureString(createAudioSegmentRequest),
      responseMappingTemplate: ensureString(createAudioSegmentResponse),
      typeName: "Mutation"
    }).addDependsOn(audioSegmentDataSource);

    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: appsyncApi.attrGraphQlUrl
    });

    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId
    });

    new cdk.CfnOutput(this, "UserPoolProviderUrl", {
      value: userPool.userPoolProviderUrl
    });

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId
    });
  }
}

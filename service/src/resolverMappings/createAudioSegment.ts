export const request = `{
  "version": "2017-02-28",
  "operation": "PutItem",
  "key": {
    "roomId": $util.dynamodb.toDynamoDBJson($context.arguments.roomId),
    "timestamp": $util.dynamodb.toDynamoDBJson($util.time.nowEpochMilliSeconds().toString())
  },
  "attributeValues": {
    "data": $util.dynamodb.toDynamoDBJson($context.arguments.data),
    "userId": $util.dynamodb.toDynamoDBJson($ctx.identity.sub)}
  }
}`;

export const response = "${util.toJson($ctx.result)}";

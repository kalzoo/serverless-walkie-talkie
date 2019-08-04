export const request = `{
  "version": "2017-02-28",
  "payload": {
  	"roomId": "$context.arguments.roomId",
    "data": "$context.arguments.data",
    "timestamp": "$util.time.nowEpochMilliSeconds().toString()",
    "userId": "$ctx.identity.sub",
  }
}`;

export const response = "${util.toJson($ctx.result)}";

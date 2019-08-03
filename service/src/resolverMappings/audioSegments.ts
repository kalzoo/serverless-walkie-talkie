export const request = {
  version: "2017-02-28",
  operation: "Query",
  //index: "roomId",
  query: {
    expression: "roomId = :roomId",
    expressionValues: {
      ":roomId": {
        S: "${context.args.roomId}"
      }
    }
  }
};

export const response = "${util.toJson($ctx.result.Items)}";

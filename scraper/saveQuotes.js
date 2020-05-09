var AWS = require('aws-sdk')
AWS.config.update({region: 'eu-central-1'});

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    event.Records.forEach(record => {
      const { body } = record;
      const quotesArray = JSON.parse(body)

      console.log(quotesArray)
      quotesArray.forEach(q => {
        var params = {
            TableName: 'QUOTES',
            Item: {
                'AUTHOR': {S: q.author},
                'QUOTE_TEXT': {S: q.quote}
            }
        }

        console.log(q)
        console.log(params)

        ddb.putItem(params, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data);
              var deleteParams = {
                QueueUrl: "<SQS:URL>",
                ReceiptHandle: record.ReceiptHandle
              };
    
              sqs.deleteMessage(deleteParams, function(err, data) {
                if (err) {
                  console.log("Delete Error", err);
                } else {
                  console.log("Message Deleted", data);
                }
              });
            }
          });

          
      })
    });
    return {};
  }
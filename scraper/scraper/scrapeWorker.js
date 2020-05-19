var AWS = require('aws-sdk')
const scrapeQuotes = require('./scrapeQuotes')

AWS.config.update({ region: 'eu-central-1' })

var sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

module.exports.handler = (event, context, callback) => {
    const url = event.Records[0].Sns.Subject;

    scrapeQuotes(url)
        .then(quotes => {
            var params = {
                DelaySeconds: 10,
                MessageAttributes: {
                    
                },
                MessageBody: JSON.stringify(quotes),
                QueueUrl: "https://sqs.eu-central-1.amazonaws.com/455420506356/SQS_Quotes"
            }

            sqs.sendMessage(params, function(err, data) {
                if (err) {
                  console.log("Error", err);
                } else {
                  console.log("Success", data.MessageId);
                }
              });
        })
        .catch(callback)


}
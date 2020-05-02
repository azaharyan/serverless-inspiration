// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create the IAM service object
var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});

//Substitute the Role field with the ARN of the role you have created
var params = {
  Code: { /* required */
    S3Bucket: 'goodreads-scraper',
    S3Key: 'saveQuotes.zip'
  },
  FunctionName: 'saveQuotes', /* required */
  Handler: 'saveQuotes.handler', /* required */
  Role: '<IAM:Role:ARN>', /* required */
  Runtime: 'nodejs12.x', /* required */
  Description: 'Uses SQS as Event Source and writes in DynamoDB table',
};
lambda.createFunction(params, function(err, data) {
  if (err) console.log(err); // an error occurred
  else     console.log(data);           // successful response
});

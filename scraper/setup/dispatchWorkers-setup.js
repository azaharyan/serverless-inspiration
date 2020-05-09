// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});

// Substitute the Role field  with the ARN of the role you have created
var params = {
  Code: { /* required */
    S3Bucket: 'goodreads-scraper',
    S3Key: 'dispatchWorkers.zip'
  },
  FunctionName: 'dispatchWorkers', /* required */
  Handler: 'dispatchWorkers.handler', /* required */
  Role: '<IAM:Role:ARN>', /* required */
  Runtime: 'nodejs12.x', /* required */
  Description: 'Dispatches workers',
};
lambda.createFunction(params, function(err, data) {
  if (err) console.log(err); // an error occurred
  else     console.log(data);           // successful response
});

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create the IAM service object
var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});


var params = {
  Code: { /* required */
    S3Bucket: 'goodreads-scraper',
    S3Key: 'scraper.zip'
  },
  FunctionName: 'scrapeWorker', /* required */
  Handler: 'scrapeWorker.handler', /* required */
  Role: '<IAM:Role:ARN>', /* required */
  Runtime: 'nodejs12.x', /* required */
  Description: 'Scrapes a Goodreads page and returns an array of quotes',
};
lambda.createFunction(params, function(err, data) {
  if (err) console.log(err); // an error occurred
  else     console.log(data);           // successful response
});

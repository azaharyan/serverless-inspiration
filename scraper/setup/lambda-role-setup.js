// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create the IAM service object
var iam = new AWS.IAM({apiVersion: '2010-05-08'});

const ROLE = "LambdaExecutionRole";

var myPolicy = {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
};

var createParams = {
 AssumeRolePolicyDocument: JSON.stringify(myPolicy),
 RoleName: ROLE
};

var lambdaPolicyParams = {
 PolicyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaRole",
 RoleName: ROLE
};

var dynamoPolicyParams = {
 PolicyArn: "arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess",
 RoleName: ROLE
};

var snsPolicyParams = {
  PolicyArn: "arn:aws:iam::aws:policy/AmazonSNSFullAccess",
  RoleName: ROLE
}

iam.createRole(createParams, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log("Role ARN is", data.Role.Arn);           // successful response
    iam.attachRolePolicy(lambdaPolicyParams, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else{
        console.log("AWSLambdaRole policy attached");           // successful response
        iam.attachRolePolicy(dynamoPolicyParams, function(err, data) {
          if (err) {
            console.log(err, err.stack); // an error occurred
          } else{
            console.log("DynamoDB read-only policy attached");           // successful response
          }
        });
      }
    });
    }
});

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-central-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'AUTHOR',
      AttributeType: 'S'
    },
    {
      AttributeName: 'QUOTE_TEXT',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'AUTHOR',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'QUOTE_TEXT',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'QUOTES',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
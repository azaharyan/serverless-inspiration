var AWS = require('aws-sdk')

AWS.config.loadFromPath('./config.json')

var createTopicPromise = new AWS.SNS({apiVersion: '2010-03-31'}).createTopic({Name: "GoodreadsScrape"}).promise()

createTopicPromise.then(data => console.log("Topic ARN is " + data.TopicArn))
    .catch(err => console.error(err, err.stack))
var AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' })

const sns = new AWS.SNS({apiVersion: '2010-03-31'})

const maxPages = 3
const getUrl = (page) =>  `https://www.goodreads.com/quotes/tag/inspirational?format=json&page=${page}`


module.exports.handler = (event, context, callback) => {
    
    const pages = []

    for(let i=1; i <= maxPages; i++) {
        pages.push(getUrl(i))
    }

    const promises = pages.map(x => new Promise((resolve, reject) => {
        const params = {
            Message: "ScrapeWorker",
            Subject: x,
            TopicArn: "<ARN>"
        }

        sns.publish(params, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
    }))

    Promise.all(promises)
        .then(event.done)
        .catch(callback)
}
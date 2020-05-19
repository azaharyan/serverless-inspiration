var fetch = require('node-fetch')
var jsdom = require('jsdom')

const { JSDOM } = jsdom

const scrapeQuotes = (url) => {
  return fetch(url)
    .then(response => {
      return response.text()
    })
    .then(response => {
      // Parse the text
      var doc = (new JSDOM(response)).window.document.body;

      let quotes = []
      const quoteGroups = doc.querySelectorAll('.quote')

      quoteGroups.forEach((elem, idx) => {
        const text = elem.querySelector('.quoteText').innerHTML.split("<br>")[0]
        const author = elem.querySelector('.authorOrTitle').innerHTML

        if (text.length > 0 && author.length > 0)
          quotes.push({
            quote: text.trim(),
            author: author.trim()
          })
      })
      return quotes
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

module.exports = scrapeQuotes
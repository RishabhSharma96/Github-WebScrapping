const cheerio = require("cheerio")
const request = require("request")
const getAllIssues = require("./issues.js")

const getAllRepositories = (url,topicName) => {

    request(url, (error, response, html) => {
        if (error) {
            console.log(error)
        }
        else {
            getAllRepo(html)
        }
    })

    const getAllRepo = (html) => {
        const $ = cheerio.load(html)
        const repos = $(".f3.color-fg-muted")

        console.log(topicName)

        for (let i = 0; i < 8; i++) {
            const repolink = $($(repos[i]).find("a")[1]).attr("href")
            const repoName = repolink.split("/").pop()
            const fullLink = `https://github.com${repolink}/issues`
            console.log(fullLink)
            getAllIssues(fullLink,topicName,repoName)
        }
    }
}

module.exports = getAllRepositories
const cheerio = require("cheerio")
const request = require("request")
const path = require("path")
const fs = require("fs")
const pdfkit = require("pdfkit")

const getAllIssues = (url,topicName,repoName) => {

    request(url, (error, response, html) => {
        if (error) {
            console.log(error)
        }
        else {
            getissue(html)
        }
    })

    const getissue = (html) => {
        const $ = cheerio.load(html)
        const issuesArray = $(".Link--primary")

        let issues = []

        for (let i = 0; i < issuesArray.length; i++) {
            const link = $(issuesArray[i]).attr("href")
            const IssueLink = `https://github.com${link}`

            issues.push(IssueLink)
        }

        console.log(topicName , issues)

        const mainFolderPath = path.join(__dirname,"Github Issues")
        make_folder(mainFolderPath)
        const topicFolderPath = path.join("Github Issues",topicName)
        make_folder(topicFolderPath)
        const filePathName = path.join(topicFolderPath,repoName+".pdf")
        
        const text = JSON.stringify(issues)
        const pdfDoc = new pdfkit
        pdfDoc.pipe(fs.createWriteStream(filePathName))
        pdfDoc.text(text)
        pdfDoc.end()
    }
}

const make_folder = (pathOfFile) => {
    if (fs.existsSync(pathOfFile) == false) {
        fs.mkdirSync(pathOfFile)
    }
}

module.exports = getAllIssues
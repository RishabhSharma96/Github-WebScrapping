const cheerio = require("cheerio")
const request = require("request")
const getAllRepositories = require("./repositories.js")

const url = "https://github.com/topics"

request(url , (error,response,html) => {
    if(error){
        console.log(error)
    }
    else{
        getAllTopics(html)
    }
})

const getAllTopics = (html) => {
    const $ = cheerio.load(html)
    const topicsArray = $(".topic-box")

    for (let i = 0; i < topicsArray.length; i++) {
        const topicLink = $($(topicsArray[i]).find("a")).attr("href")
        let topicName = topicLink.split("/").pop()
        const fullTopicLink = "https://github.com"+topicLink
        console.log((fullTopicLink))  
        getAllRepositories(fullTopicLink,topicName)
    }
}
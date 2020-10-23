const fs = require("fs")
const users = require("./users.json")
const posts = require("./posts.json")

let votes = []
let i = 1

while (i < 250) {
    const randomVoterId = {
        voter_id: users[(Math.floor(Math.random() * users.length))].id
    }

    const randomPostId = {
        post_id: posts[(Math.floor(Math.random() * posts.length))].id
    }

    if (!(JSON.stringify(votes).includes(JSON.stringify(randomVoterId)) && !(JSON.stringify(votes).includes(JSON.stringify(randomPostId))))){
        votes.push({
            id: i,
            voter_id: randomVoterId.voter_id,
            post_id: randomPostId.post_id,
        })
        i++
    }
}


fs.writeFile(`./data/votes.json`, JSON.stringify(votes), (err) => { if (err) console.log(err)})
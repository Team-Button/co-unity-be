const fs = require("fs")
const users = require("./users.json")
const posts = require("./posts.json")

let fakeComments = [
    "No way!",
    "I agree!",
    "Good idea, we should do that ASAP",
    "I think we need to discuss this more in details",
    "I don't agree with you",
    "I've been waiting to see this!",
    "I love the initiative",
    "I think this is something everbody can agree on",
    "We need to prioritize this ASAP, can everybody please upvote this?",
    "This shouldn't even be an agenda",
    "Cool, when do we start?",
    "Let's not rush it. We really need to think this through",
    "What are we even waiting for?",
    "I don't think we have enough budget. We need to find a way to fund this",
    "My kid is going to love this",
]
let comments = []

for (let i =0; i <200; i++){
    let randomUser = users[(Math.floor(Math.random() * users.length))]
    comments.push({
        id: i+1,
        post_id: posts[(Math.floor(Math.random() * posts.length))].id,
        comment: fakeComments[(Math.floor(Math.random() * fakeComments.length))],
        user_id: randomUser.id,
    })
}


fs.writeFile(`./data/comments.json`, JSON.stringify(comments), (err) => { if (err) console.log(err)})
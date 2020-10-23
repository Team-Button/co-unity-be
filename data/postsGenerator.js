const fs = require('fs')
const moment = require("moment")
const users = require("./users.json")


let randomUsers = []
for (let i=0; i<10; i++){
    randomUsers.push(users[(Math.floor(Math.random() * users.length))])
}

let posts = [
    {
      id: 1,
      topic: "Please wear masks",
      description: "I went to the store in our neighborhood today and saw that not a lot of people wear masks. We need to flatten the curve, people! We can't have anybody gets sick, especially our seniors and children. Please for the love of God, wear masks, and if we can help provide masks for each other, too.",
      reported_by: randomUsers[0].id,
      posted_date: moment().format(),
      category_id: 4,
      zipcode: randomUsers[0].zipcode,
      is_archived: false,
      photo: "https://cdn.pixabay.com/photo/2020/05/07/08/30/coronavirus-5140667_960_720.jpg"
    },
    {
      id: 2,
      topic: "Possible Hoarder Issue",
      description: "I'm suspecting that the lady living in that 284xx Derp Street is a hoarder. Here is my photo evidence. Can somebody send someone to look at her house and confirm my suspicion? I'm afraid it'll be unsafe for her to continue living like this",
      reported_by: randomUsers[1].id,
      posted_date: moment().format(),
      category_id: 6,
      zipcode: randomUsers[1].zipcode,
      is_archived: true,
      photo: "https://cdn.pixabay.com/photo/2018/03/01/09/05/shelf-3190116_960_720.jpg"
    },
    {
      id: 3,
      topic: "Missing Cat",
      description: "My little cat, Princess, has been missing from my house. I must have left my door open and she walked out. Please help me find my dear kitten. Look at her picture. She is such a sweet little angel",
      reported_by: randomUsers[2].id,
      posted_date: moment().format(),
      category_id: 3,
      zipcode: randomUsers[2].zipcode,
      is_archived: false,
      photo: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg"
    },
    {
      id: 4,
      topic: "We should add the light to this road",
      description: "Please upvote if you agree with me",
      reported_by: randomUsers[3].id,
      posted_date: moment().format(),
      category_id: 1,
      zipcode: randomUsers[3].zipcode,
      is_archived: false,
      photo: "https://cdn.pixabay.com/photo/2017/03/27/13/05/conifer-2178595_960_720.jpg"
    }
  ]





fs.writeFile(`./data/posts.json`, JSON.stringify(posts), (err) => { if (err) console.log(err)})
const moment = require("moment")

exports.seed = async function(knex) {
  
  await knex("posts").insert([
    {
      topic: "Please wear masks",
      description: "I went to the store in our neighborhood today and saw that not a lot of people wear masks. We need to flatten the curve, people! We can't have anybody gets sick, especially our seniors and children. Please for the love of God, wear masks, and if we can help provide masks for each other, too.",
      reported_by: 6,
      posted_date: moment().format(),
      category_id: 4,
      photo: "https://cdn.pixabay.com/photo/2020/05/07/08/30/coronavirus-5140667_960_720.jpg"
    },
    {
      topic: "Possible Hoarder Issue",
      description: "I'm suspecting that the lady living in that 284xx Derp Street is a hoarder. Here is my photo evidence. Can somebody send someone to look at her house and confirm my suspicion? I'm afraid it'll be unsafe for her to continue living like this",
      reported_by: 7,
      posted_date: moment().format(),
      category_id: 6,
      photo: "https://cdn.pixabay.com/photo/2018/03/01/09/05/shelf-3190116_960_720.jpg"
    },
    {
      topic: "Missing Cat",
      description: "My little cat, Princess, has been missing from my house. I must have left my door open and she walked out. Please help me find my dear kitten. Look at her picture. She is such a sweet little angel",
      reported_by: 3,
      posted_date: moment().format(),
      category_id: 3,
      photo: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg"
    },
    {
      topic: "Missing Cat",
      description: "My little cat, Princess, has been missing from my house. I must have left my door open and she walked out. Please help me find my dear kitten. Look at her picture. She is such a sweet little angel",
      reported_by: 3,
      posted_date: moment().format(),
      category_id: 3,
      photo: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg"
    },
    {
      topic: "I'm sorry I didn't know I post this twice. Or thrice now.",
      description: "How do I delete the other one now?",
      reported_by: 3,
      posted_date: moment().format(),
      category_id: 3,
      photo: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg"
    },
    {
      topic: "We should add the light to this road",
      description: "Please upvote if you agree with me",
      reported_by: 6,
      posted_date: moment().format(),
      category_id: 1,
      photo: "https://cdn.pixabay.com/photo/2017/03/27/13/05/conifer-2178595_960_720.jpg"
    }
  ]);
  
};
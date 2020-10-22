const db = require("../../database/dbconfig");


module.exports = {
    getPublicPosts,
}

function getPublicPosts() {
    let posts = db("posts")
        .join("categories", { "posts.category_id": "categories.id"})
        .join("users", { "posts.reported_by": "users.id"})
        .select(
            "posts.id", 
            "topic", 
            "description", 
            "posted_date",
            "users.id as reporter_id",
            "users.name as reporter", 
            "categories.category as category", 
            "photo")

    return posts.then( resolvedPosts => {
        //getting a vote from each post
        const proms = resolvedPosts.map(async (post) => {
            const postVotes = await getVotes(post.id)
                return {
                    ...post,
                    votes: postVotes
                }
            })
        return Promise.all(proms)
    })
        
}

function getVotes(postId){
    return db("votes").where("post_id", postId).select("id","voter_id")
}
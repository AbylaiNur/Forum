const User = require("../models/user");
const Thread = require("../models/thread")
const Join = require("../models/join")
const Post = require("../models/post");
const PostVote = require("../models/postVote");

const profile_the_user = async (req, res) => {
    const user = req.session.user
    const joins = await Join.find( { user_id: user._id} )
    const threads = []

    let i = 0
    for (const join of joins) {
        threads.push((await Thread.findById(join.thread_id)).toObject())
        threads[i].joins_count = await Join.find({ 'thread_id' : threads[i]._id }).count()
        if (user && await Join.findOne({ 'thread_id' : threads[i]._id, 'user_id' : user._id })) {
            threads[i].is_joined = true
        } else {
            threads[i].is_joined = false
        }
        i++
    }

    let posts = await Post.find({ user_id : user._id }).sort( { createdAt : -1 } )

    const newPosts = [];
    for (const post of posts) {
        const newPost = post.toObject()
        newPost.author = (await User.findById( post.user_id )).username

        const postVote = await PostVote.findOne( { user_id : req.session.user._id, post_id : post._id } )
        console.log(postVote)
        if (!postVote) {
            newPost.isUpvoted = false
            newPost.isDownvoted = false
        } else if (postVote.value >= 1) {
            newPost.isUpvoted = true
            newPost.isDownvoted = false
        } else {
            newPost.isUpvoted = false
            newPost.isDownvoted = true
        }

        const voteSum = (await PostVote.aggregate([
            {
                $match: {
                    post_id: post._id
                }
            },
            {
                $group: {
                    _id: "$post_id",
                    totalValue: { $sum: "$value" }
                }
            }
        ]))[0]

        if (voteSum) {
            newPost.voteSum = voteSum.totalValue
        } else {
            newPost.voteSum = 0
        }

        newPosts.push(newPost)
    }
    posts = newPosts

    res.render('profileUser', {user: user, threads: threads, posts : posts});
}


const edit_user_page = async (req, res) => {
    const id = req.session.user._id;
    let user = await User.findById(id);
    res.render('editTheUser', {user});
}

const edit_user = async (req, res) => {
    const id = req.session.user._id;
    const user = req.body;
    await User.findByIdAndUpdate(id, user);
    res.redirect('/profile');
}

const profile_to_login = (req, res) => {
    res.redirect('login');
}

const profile_to_admin_panel = (req, res) => {
    res.redirect('adminPanel');
}


const profile_delete = (req, res) => {

    User.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json( {redirect : '/adminPanel'} )
        })
        .catch((err) => console.log(err));
}

module.exports = {
    profile_delete,
    profile_the_user,
    profile_to_login,
    profile_to_admin_panel,
    edit_user_page,
    edit_user
}
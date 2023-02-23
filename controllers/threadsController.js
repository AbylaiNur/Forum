const Thread = require('../models/thread')
const Join = require('../models/join')
const Post = require('../models/post')
const User = require('../models/user')
const PostVote = require('../models/postVote')
const {isAuth} = require("../helpers/helper");

const index_threads = async (req, res) => {
    const user = req.session.user
    let threads = await Thread.find()

    const newThreads = [];
    for (const thread of threads) {
        newThreads.push(thread.toObject())
    }
    threads = newThreads

    for (let i = 0; i < threads.length; i++) {
        threads[i].joins_count = await Join.find({ 'thread_id' : threads[i]._id }).count()
        if (user && await Join.findOne({ 'thread_id' : threads[i]._id, 'user_id' : user._id })) {
            threads[i].is_joined = true
        } else {
            threads[i].is_joined = false
        }
    }
    console.log(threads)
    res.render('threads', { threads: threads, user: user });
}


const index_create_thread = async (req, res) => {
    const user = req.session.user

    res.render('createThread', {user: user});
}


const create_thread = async (req, res) => {
    const user = req.session.user

    const thread = new Thread(req.body)
    await thread.save()
    res.redirect('/threads')
}


const join_thread = async (req, res) => {
    const user = req.session.user
    const thread = new Join({ user_id: user._id, thread_id: req.params.threadId})
    await thread.save()
    res.redirect('back')
}


const leave_thread = async (req, res) => {
    const user = req.session.user
    const thread = await Join.findOne({ user_id: user._id, thread_id: req.params.threadId})
    await thread.remove()
    res.redirect('back')
}



const index_thread = async (req, res) => {
    const thread = (await Thread.findById( req.params.threadId )).toObject()
    let posts = await Post.find({ thread_id : req.params.threadId }).sort( { createdAt : -1 } )
    const user = req.session.user

    const newPosts = [];
    for (const post of posts) {
        const newPost = post.toObject()
        newPost.author = (await User.findById( post.user_id )).username

        const postVote = await PostVote.findOne( { user_id : req.session.user._id, post_id : post._id } )
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

    if (user && await Join.findOne({ 'thread_id' : thread._id, 'user_id' : user._id })) {
        thread.is_joined = true
    } else {
        thread.is_joined = false
    }

    thread.joins_count = await Join.find({ 'thread_id' : thread._id }).count()

    res.render('thread', { thread: thread, posts: posts, user: user })
}

module.exports = {
    index_threads,
    index_create_thread,
    create_thread,
    join_thread,
    leave_thread,
    index_thread,
}
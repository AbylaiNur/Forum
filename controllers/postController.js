const Post = require('../models/post')
const Thread = require('../models/thread')
const PostVote = require('../models/postVote')
const Comment = require('../models/comment')
const User = require("../models/user");
const Join = require("../models/join");

const create_post = async (req, res) => {
    const user = req.session.user
    const thread = await Thread.findOne({ name : req.body.threadName })
    const obj = req.body
    obj.thread_id = thread._id
    obj.user_id = req.session.user._id
    const post = new Post(obj)
    await post.save()
    res.redirect(`/threads/${thread._id}`)
}


const index_create_post = async (req, res) => {
    const user = req.session.user
    res.render('createPost', {user: user})
}


const create_post_upvote = async (req, res) => {
    const vote = PostVote.findOne( { user_id: req.session.user._id, post_id: req.params.postId } )
    await vote.remove()

    const postUpvote = new PostVote({ user_id: req.session.user._id, post_id: req.params.postId, value: 1 })
    await postUpvote.save()
    res.redirect('back')
}

const remove_post_upvote = async (req, res) => {
    const vote = PostVote.findOne( { user_id: req.session.user._id, post_id: req.params.postId } )
    await vote.remove()
    await res.redirect('back')
}

const create_post_downvote = async (req, res) => {
    const vote = PostVote.findOne( { user_id: req.session.user._id, post_id: req.params.postId } )
    await vote.remove()

    const postDownvote = new PostVote({ user_id: req.session.user._id, post_id: req.params.postId, value: -1 })
    await postDownvote.save()
    res.redirect('back')

}

const remove_post_downvote = async (req, res) => {
    const vote = await PostVote.findOne( { user_id: req.session.user._id, post_id: req.params.postId } )
    await vote.remove()
    res.redirect('back')
}

const index_post = async (req, res) => {
    let comments = await Comment.find({ post_id : req.params.postId })
    const newComments = []
    for (const comment of comments) {
        const newComment = comment
        newComment.username = (await User.findById( comment.user_id )).username

        newComments.push(comment)
    }

    const user = req.session.user
    let post = await Post.findById( req.params.postId )
    const thread = await Thread.findById( post.thread_id )

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
    post = newPost

    if (user && await Join.findOne({ 'thread_id' : thread._id, 'user_id' : user._id })) {
        thread.is_joined = true
    } else {
        thread.is_joined = false
    }
    thread.joins_count = await Join.find({ 'thread_id' : thread._id }).count()


    res.render('post', { user : user, thread : thread, comments : comments, post : post })
}


const create_comment = async (req,res) => {
    const id = req.params.postId;
    const comment = new Comment ({
        post_id: id,
        level: 0,
        username: String(req.session.user.username),
        body: req.body.body,
        user_id: req.session.user._id
    })


    comment.save();
    res.redirect('back');
}

const create_reply_comment = async (req,res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const comment = new Comment ({
        post_id: String(postId),
        level: 1,
        username: String(req.session.user.username),
        body: req.body.reply,
        user_id: req.session.user._id
    });


    await Comment.findByIdAndUpdate(commentId, {$push: {replies: comment._id }});

    comment.save();
    res.redirect('back');
}

module.exports = {
    index_create_post,
    create_post,
    create_post_upvote,
    create_post_downvote,
    remove_post_upvote,
    remove_post_downvote,
    index_post,
    create_comment,
    create_reply_comment,
}
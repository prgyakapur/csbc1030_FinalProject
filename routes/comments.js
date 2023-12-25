//comments router
const express = require("express");
const router = express.Router();
// const app = express();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Posts = require('../models/posts');
const User = require('../models/user.js');
const Comments = require("../models/comments");

router.get('/get', auth, async (req, res) => {  //get all the comments 
    try {
      console.log("get");
    //   const reqUserId = req.params.id;
    //   const authUserId = req.user.userId;
      const comments = await Comments.findAll();
      res.json(comments);
      
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Server error (get)' });
    }
  });

  router.get('/:postId/:commentId', auth, async (req, res) => { //fetching particular ID
    try {
      const reqUserId = req.user.userId;
      const authUserId = req.user.userId;
      const commentId = req.params.commentId;
      const postId = req.params.postId;
      const post = await Posts.findByPk(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
     console.log(req.user);
     console.log(req.params);
     console.log(reqUserId,authUserId);
     console.log(post.userId);
     console.log(post);
      if (post.id == authUserId) {
        console.log("test");
        const comment = await Comments.findByPk(commentId);
        // console.log(post);
        if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
  
        res.status(200).json(comment);
      }
      else {
        return res.status(403).json({ error: 'Access denied' });
      }
    } catch(error) {
      res.status(500).json({ error: 'Server error' });
    }
  
  });

  router.post('/add', auth, async (req, res) => {  //add a new comment
    try {
      const authUserId = req.user.userId;
      const reqUserId = req.body.id;
      const postId = req.body.post_id;
    //   console.log(req.user);
      const post = await Posts.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
    //   console.log(authUserId);
    //   console.log(reqUserId);
      if (post.id !== authUserId) {
        return res.status(403).json({ error:'Access denied' });
      }
  
      const newComment = await Comments.create(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.patch('/:postId/:commentId', auth, async (req, res) => {
    try {
      const reqUserId = req.params.userId;
      const authUserId = req.user.userId;
      const postID = req.params.postId;
      const commentID = req.params.commentId;
      console.log(reqUserId);
      console.log(authUserId);
      console.log(req.user);
      console.log(req.params);
        // Check if the post exists
        const existingComment = await Comments.findOne({
            where:{
                post_id: postID,
                comment_id: commentID
            }
        });
        if (!existingComment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
  
        // Update the post
        const updatedComment = await Comments.update(
          {
            comment: req.body.comment, 
          },
          {
            where: {
              post_id: postID,
              comment_id: commentID,
            },
          }
        );
  
        // Check if the update was successful
        if (updatedComment[0] === 1) {
          // Fetch and return the updated post
          const updatedCommentData = await Comments.findByPk(commentID);
          return res.status(200).json(updatedCommentData);
        } else {
          return res.status(500).json({ error: 'Failed to update comment' });
        }
      
    } catch (error) {
      console.error('Error updating comment:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.delete('/:postId/:commentId', auth, async (req, res) => {
    try {
    //   const reqUserId = req.params.userId;
      const authUserId = req.user.userId;
      const postID = req.params.postId;
      const commentID = req.params.commentId;
  
      // Check if the comment exists
      const existingComment = await Comments.findOne({
        where: {
          post_id: postID,
          comment_id: commentID
        }
      });
  
      if (!existingComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
    //   console.log(existingComment.post_id);
    //   console.log(postID);
      const existingPostID = existingComment.post_id;
    //   existingPostID.toString();
      if (String(existingPostID) !== String(postID)) {
        return res.status(403).json({ error: 'Access denied here' });
      }
      // Delete the comment
      const deletedCommentCount = await Comments.destroy({
        where: {
          post_id: postID,
          comment_id: commentID
        }
      });
  
      // Check if the delete was successful
      if (deletedCommentCount === 1) {
        return res.status(201).json({success:'Deleted successfully'}); // success message
      } else {
        return res.status(500).json({ error: 'Failed to delete comment' });
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  module.exports = router;

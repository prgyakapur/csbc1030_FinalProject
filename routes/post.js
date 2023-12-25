//post routes
const express = require("express");
const router = express.Router();
// const app = express();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Posts = require('../models/posts');
const User = require('../models/user.js');

router.get('/get', auth, async (req, res) => {  //get all the posts
  try {
    console.log("get");
    const reqUserId = req.params.id;
    const authUserId = req.user.userId;
    const posts = await Posts.findAll();
    res.json(posts);
    
  } catch (error) {
    res.status(500).json({ error: 'Server error (get)' });
  }
});

router.get('/:userId/:postId', auth, async (req, res) => { //fetching particular ID
    try {
      const reqUserId = req.params.userId;
      const authUserId = req.user.userId;
      const postID = req.params.postId;
     console.log(req.user);
     console.log(req.params);
      if (reqUserId == authUserId) {
        console.log("test");
        const post = await Posts.findByPk(postID);
        // console.log(post);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        res.status(200).json(post);
      }
      else {
        return res.status(403).json({ error: 'Access denied' });
      }
    } catch(error) {
      res.status(500).json({ error: 'Server error' });
    }
  
  
  });

  router.post('/add', auth, async (req, res) => {  //add a post
    try {
      const authUserId = req.user.userId;
      const reqUserId = req.body.id;
      console.log(authUserId);
      console.log(reqUserId);
      if (authUserId !== reqUserId) {
        return res.status(403).json({ error:'Access denied' });
      }
  
      const newPost = await Posts.create(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.patch('/:userId/:postId', auth, async (req, res) => {
    try {
      const reqUserId = req.params.userId;
      const authUserId = req.user.userId;
      const postID = req.params.postId;
      console.log(reqUserId);
      console.log(authUserId);
      console.log(req.user);
      console.log(req.params);
      if (reqUserId == authUserId) {
        // Check if the post exists
        const existingPost = await Posts.findOne({
            where:{
                id: reqUserId,
                post_id: postID
            }
        });
        if (!existingPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        // Update the post
        const updatedPost = await Posts.update(
          {
            post_name: req.body.post_name,
            body: req.body.body,
          },
          {
            where: {
              post_id: postID,
              id: reqUserId,
            },
          }
        );
  
        // Check if the update was successful
        if (updatedPost[0] === 1) {
          // Fetch and return the updated post
          const updatedPostData = await Posts.findByPk(postID);
          return res.status(200).json(updatedPostData);
        } else {
          return res.status(500).json({ error: 'Failed to update post' });
        }
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
module.exports = router;

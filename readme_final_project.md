## Final project csbc1030

1. Install necessary dependencies 
npm init     
npm install express
npm install jsonwebtoken
npm install sequelize mysql2
npm install mocha chai supertest --save-dev

2. Modify mysql db credentials
3. To run the code 
- node index.js

# Testing
- For Unit Testing
npx mocha test/unit/users.test.js

- For End To End Testing
npx mocha test/end2end/emd2end.js

## Postman
# get all users
localhost:3000/users/get
# login
localhost:3000/users/login
{ "username":"admin",
  "password":"1234
}

# add user
localhost:3000/users/add
{ "id":"1",
"username":"user",
"password":"abcd"
}
# get user by id
localhost:3000/users/:id
# get all posts
localhost:3000/posts/get
# get post by id
localhost:3000/posts/:userId/:postId   //for better understanding I have used both IDs
# add new post
localhost:3000/posts/add
{
"post_id":"1",
"post_name":"post 1",
"body":"sample post",
"id":"1"
}
# update post
localhost:3000/posts/:userId/:postId
# get comments
localhost:3000/comments/get       //for better understanding I have used URL like this
# get comment by id
localhost:3000/comments/:postID/:commentId
# add new comment
localhost:3000/comments/add
{
"comment_id":"1",
"comment":"sample comment",
"post_id":"1"
}
# update a comment
localhost:3000/comments/:postID/:commentId
{ "comment":"edited comment"}
# delete a comment
localhost:3000/comments/:postID/:commentId



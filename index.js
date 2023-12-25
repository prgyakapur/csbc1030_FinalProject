//index.js
const process = require('process');
const express = require("express");
const app = express();
const users = require("./routes/users");
const posts = require("./routes/post");
const comments = require("./routes/comments");
app.use(express.json());
app.use("/users", users);
app.use("/posts",posts);
app.use("/comments",comments);
const sequelize = require('./models/db');
require('./models/sync')
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // set force to true to drop and re-create tables on every sync
  .then(() => {
    console.log('Database and tables synced!');
//     User.hasMany(Posts,{foreignKey: 'user_id'});
// Posts.belongsTo(User, { foreignKey: 'user_id' });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;

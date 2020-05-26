require('dotenv').config();
const express = require('express');
const session = require('express-session');
const multer = require('multer')
const cors = require('cors');
const app = express();
const {apiPort, SESSION_SECRET, CONNECTION_STRING} = process.env
const { login, registerUser, deleteUser, logout, getSession, editUser, saveColorProfile, getColorProfile, newPost, getPosts, editPost, deletePost, saveFilePaths } = require('./auth-controller')

app.use(express.json());
app.use(cors())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
  let upload = multer({storage: storage}).single('file')
  
  app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
    return res.status(200).send(req.file)
    })
  });
  app.post('/uploadProfile', function(req, res) {
      upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
    return res.status(200).send(req.file)
    })
  });

app.post('/auth/login', login);
app.post('/auth/register', registerUser);
app.get('/auth/getSession', getSession)
app.get('/auth/logout', logout)
app.delete('/auth/deleteUser/:id', deleteUser)
app.put('/auth/editUser', editUser)
app.post('/auth/saveColors', saveColorProfile)
app.post('/auth/getColors', getColorProfile)
app.post('/api/post', newPost)
app.get('/api/getPosts', getPosts)
app.post('/api/editPost', editPost)
app.put('/api/deletePost', deletePost)
app.post('/api/saveFilePaths', saveFilePaths)

app.listen(apiPort, () => console.log(`Servin' up some 🔥 🔥 🔥 on Port ${apiPort}`));
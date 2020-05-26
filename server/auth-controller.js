const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res, next) => {
    const { password, email } = req.body;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        const foundUser = await usersCollection.find({email}).toArray();
        if (foundUser[0]) {
          const matchPasswords = await bcrypt
            .compare(password, foundUser[0].password)
            .catch(err => console.log(err));
          if (matchPasswords) {
            let user = {
              name: foundUser[0].name,
              id: foundUser[0]._id,
              colorProfile: foundUser[0].colorProfile,
              logArray: foundUser[0].logArray,
              loggedIn: true,
              fileNamePathCover: foundUser[0].fileNamePathCover,
              fileNamePathProfile:  foundUser[0].fileNamePathProfile
            };
            console.log('user sesh, found user?', foundUser[0])
            req.session.user = user;
            res.status(200).send(user);
          } else {
            res.status(401).send("Incorrect email and/or password combination");
          }
        } else {
          res
            .status(401)
            .json(
              "That user does not exist"
            );
          }
      })
      .catch((e) => console.log(e));
  },
  registerUser: async (req, res, next) => {
    const { name, password, email } = req.body;
    console.log("here we GOO", name, password, email)
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        const foundUserEmail = await usersCollection.find({email}).toArray();
        if (foundUserEmail[0]) {
          res
            .status(409)
            .json(
              "That email is already in use, please register with another email address."
            );
        } else {
          const saltRounds = 12;
          bcrypt.genSalt(saltRounds).then(salt => {
            bcrypt.hash(password, salt).then(hashedPassword => {
              usersCollection
                .insertOne({ email, name, password: hashedPassword, colorProfile: { background: 'rgb(61, 54, 54)', headerColors: 'rgb(245, 245, 214)', text: 'rgb(245, 245, 214)'}, logArray: [], fileNamePathCover: 'tulum.png',
                fileNamePathProfile: 'sunset.png' })
                .then(() => {
                  usersCollection
                    .find({email})
                    .toArray()
                    .then((results) => {
                      let user = {
                        name: results[0].name,
                        id: results[0]._id,
                        colorProfile: results[0].colorProfile,
                        logArray: results[0].logArray,
                        loggedIn: true,
                        fileNamePathCover: results[0].fileNamePathCover,
                        fileNamePathProfile: results[0].fileNamePathProfile
                      };
                      req.session.user = user;
                      res.status(200).send(user);
                    })
                    .catch((e) => console.log(e));
                })
                .catch((error) => console.error(error));
              });
            });
          }
      })
      .catch((e) => console.log(e));
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        usersCollection
          .deleteOne({_id: ObjectID(id)})
          req.session.destroy();
        res.status(200).send("Successful delete");
      })
      .catch((e) => console.log(e));
  },
  editUser: (req, res) => {
    const { name, id } = req.body;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        let resolved = await usersCollection
        .updateOne({ _id: ObjectID(id) }, { $set: { name: name}})
        usersCollection
        .find({name: name})
        .toArray()
        .then(results => {
          let user = {
            name: results[0].name,
            id: results[0]._id,
            colorProfile: results[0].colorProfile,
            logArray: results[0].logArray,
            loggedIn: true,
            fileNamePathCover: results[0].fileNamePathCover,
            fileNamePathProfile: results[0].fileNamePathProfile
          }       
          req.session.user = user
          res.status(200).send(results);
        }).catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getSession: (req, res) => {
    res.status(200).send(req.session.user)
  },
  saveColorProfile: (req, res) => {
    const { background, headerColors, text, userId } = req.body;
    console.log('userId', userId)
    let colorProfile = { background, headerColors, text}
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        usersCollection
        .updateOne({ _id: ObjectID(userId) }, { $set: { colorProfile: colorProfile}})
        delete req.session.user.colorProfile
        req.session.user.colorProfile = colorProfile
        res.status(200).send("Successfully saved profile");
      })
      .catch((e) => console.log(e));
  },
  getColorProfile: (req, res) => {
    const { id } = req.body;
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        usersCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then(results => {
          let styles = {
            backround: results[0].colorProfile.background,
            headerColors: results[0].colorProfile.headerColors,
            text: results[0].colorProfile.text
          }       
          res.status(200).send(styles);
        }).catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  },
  newPost: (req, res) => {
    const { location, description } = req.body;
    let id = req.session.user.id
    let post = {location, description}
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        usersCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then(results => {
          let newArray = [...results[0].logArray, post]
          usersCollection
          .updateOne({ _id: ObjectID(id) }, { $set: { logArray: newArray}})
          res.status(200).send('completed')
        }).catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  },
  getPosts: (req, res) => {
    let id = req.session.user.id
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        usersCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then(results => {
          res.status(200).send(results[0].logArray)
        }).catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  },
  editPost: (req, res) => {
    let id = req.session.user.id
    let {location, description, originalLocation} = req.body
    let editedPost = {location, description}
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        usersCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then(results => {
          let array = results[0].logArray
          let index
          for (let i = 0; i < array.length; i++){
            if (array[i].location == originalLocation){
              index = i
            }
          }
          let arrEdit = array.filter((elem, i) => i !== index)
          let finalArr = [...arrEdit, editedPost]
          usersCollection
          .updateOne({ _id: ObjectID(id) }, { $set: { logArray: finalArr}})
          res.status(200).send(finalArr)
        }).catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  }, 
  deletePost: (req, res) => {
    let id = req.session.user.id
    let {location} = req.body
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        usersCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then(results => {
          let array = results[0].logArray
          let index
          for (let i = 0; i < array.length; i++){
            if (array[i].location == location){
              index = i
            }
          }
          let arrEdit = array.filter((elem, i) => i !== index)
          usersCollection
          .updateOne({ _id: ObjectID(id) }, { $set: { logArray: arrEdit}})
          res.status(200).send(arrEdit)
        }).catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  },
  saveFilePaths: (req, res) => {
    let id = req.session.user.id
    let {fileNamePathCover} = req.body
    MongoClient.connect(CONNECTION_STRING, { useUnifiedTopology: true })
      .then(async (client) => {
        console.log("Connected to Database");
        const db = client.db("travelog");
        const usersCollection = db.collection("users");
        let mongodb = require("mongodb");
        let ObjectID = mongodb.ObjectID;
        let finished = await usersCollection
        .updateOne({ _id: ObjectID(id) }, { $set: {fileNamePathCover: fileNamePathCover}})
        usersCollection
        .find({ _id: ObjectID(id) })
        .toArray()
        .then(results => {
          console.log('results', results)
          let filePaths = {
            fileNamePathCover: results[0].fileNamePathCover
          }
          req.session.user.fileNamePathCover = results[0].fileNamePathCover
          res.status(200).send(filePaths.fileNamePathCover)
        }).catch(err => console.log(err))
      })
      .catch((e) => console.log(e));
  }
};
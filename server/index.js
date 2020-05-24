require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const {apiPort, SESSION_SECRET, CONNECTION_STRING} = process.env
const { login, registerUser, deleteUser, logout, getSession, editUser } = require('./auth-controller')

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.post('/auth/login', login);
app.post('/auth/register', registerUser);
app.get('/auth/getSession', getSession)
app.get('/auth/logout', logout)
app.delete('/auth/deleteUser/:id', deleteUser)
app.put('/auth/editUser', editUser)

app.listen(apiPort, () => console.log(`Servin' up some 🔥 🔥 🔥 on Port ${apiPort}`));
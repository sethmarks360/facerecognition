const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const Register = require('./controllers/Register');
const Signin = require('./controllers/Signin');
const Profile = require('./controllers/Profile');
const Image = require('./controllers/Image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'sethmarks',
    password : 'cheesecake1',
    database : 'imagerecdb'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send(db.users) });
app.post('/signin', Signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { Register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { Profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { Image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { Image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
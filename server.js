import express from 'express'
import mongoose from 'mongoose'
import testmodel from './models/testmodel'
import dotenv from 'dotenv'
import path from 'path'
import nunjucks from 'nunjucks'
dotenv.config()

const port = process.env.PORT || 3000,
  dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
  urlEncodedParser = express.urlencoded({ extended: true }),
  app = express()

mongoose.connect(dbURL, { useUnifiedTopology: true, useFindAndModify: false })

nunjucks.configure(['views/pages'], {
  autoescape: true,
  express: app
})

app
  .use(express.json())
  .use(urlEncodedParser)
  .set('view engine', 'html')
  .get('/', (req, res) => {
    res.send('hey')
  })
  .get('/like', (req, res) => {
    const data = {
      title: 'Like page'
    }
    res.render('like.html', data)
  })
  .post('/like', (req, res) => {
    if(req.body) {
      createNewUser(req.body)
    }
    res.send('heey')
  })
  .listen(port, () => console.log(`Using port: ${port}`))


async function getData() {
  const data = await testmodel.find({}).lean()
  console.log(data)
}

function createNewUser(user) {
  const foo = new testmodel({
    username: user.username,
    password: user.password,
    gender: user.gender,
    email: 'someemail@gmail.com'
  })

  foo.save(error => {
    error ? console.log(`Something went wrong: ${error}`) : console.log('foo')
  })
}

function updateUser(username) {
  testmodel.findOneAndUpdate({username: 'damian'}, {$set: {password: 'foobar', username: 'rocket'}}).lean()
    .then(users => {
      console.log(users)
    })
    .catch(error => {
      console.log(error)
    })
}


function deleteUser() {
  testmodel.deleteOne({username: 'foobar'}).lean()
    .then(users => {
      console.log(users)
    })
    .catch(error => {
      console.log(error)
    })
}

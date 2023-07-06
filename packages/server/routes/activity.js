import express from 'express'
import bcrypt from 'bcryptjs'
import { User, Post } from '../models'
import keys from '../config/keys'
import jwt from 'jsonwebtoken'

const router = express.Router()
//Hello World
router.get('/hello/:name', async (request, response) => {
    const { name } = request.params
    const { greeting } = request
  
    try {
      if (name) {
        response.json(`Hello, ${name}`)
      }
    } catch (err) {
      return response.json({ error: err })
    }
  })


router.get('/add/:x/:y', async (request, response) => {
const { x , y } = request.params


const numberX = Number(x)
const numberY = Number(y)
const sum = numberX + numberY

try {
    if (sum.toString() === 'NaN') {
        response.status(422).json({error: `At least one parameter is not a number`})
    }
    else {
    response.json(`The sum is ${sum}`)
    }
} catch (err) {
    return response.json(err)
}
})

router.get('/teapot' , async (request, response) =>{
        response.status(418).json({"amIATeapot": true})
    }
)

router.post('/teapot', async (request , response) =>{
    const {text} = request.body

    const teapot = ({
        text: true
    })
    
    try {
        if (teapot.text.toString() === text){
            response.status(418).json({amIATeapot: 'yes'})
        } else {
            response.status(200).json({amIATeapot: 'no'})
        }
        } catch {
        return response.json(`Definitely not teapot activities`)
    }
})

router.get('/alice', async (request, response) =>{
    const populateQuery = [
        {
          path: 'posts',
          populate: { path: 'author', select: ['username', 'profile_image', 'email'] },
        },
      ]

    const user = await User.findOne({ username: 'alice' })
    .populate(populateQuery)
    .exec()
  if (user) {
    response.status(200).json(user.toJSON())
  } else {
    response.status(404).end()
  }
}
)

router.get('/top', async (request, response) => {
    const populateQuery = [
        { path: 'author', select: ['username', 'profile_image'] },,
      ]
      const all = await User.find({})
        .sort({ created: -1 })
        .populate(populateQuery)
        .exec()
        
    let users = all.map((user) => [` ${user.username}`, user.posts.length]).sort((a,b) => b[1] - a[1])
    let results = `#1:${users[0]} posts #2:${users[1]} posts #3:${users[2]} posts`
    let top3 = results.replaceAll(',', ' has ')

    try {
    response.status(200).json(`Top 3 Most Active Users| ${top3}`)
  } catch (err) {
    return response.json(err)
}
})

  module.exports = router


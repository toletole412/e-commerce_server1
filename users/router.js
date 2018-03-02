const Router = require('express').Router
const User = require('./model')
const bcrypt = require('bcrypt')
const secret = require('../jwt').secret
const sign = require('../jwt').sign

const router = new Router()

/*
const signedPassword = (password) => {
  return `${secret}${password}${secret}${secret}`
}*/
//bcrypt 는 이미 좋기 때문에 굳이 소금칠 필요는 없음

/*router.post('/users', (req, res) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(signedPassword(req.body.password), 10)
  }
  */

router.post('/users', (req, res) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }

  User
  .create(user)
    .then(entity => {
      res.status(201)
      res.json({
        id: entity.id,
        email: entity.email
      })
    })
    .catch(err => {
      res.status(422)
      res.json({ message: err.message })
    })
  })

  router.post('/logins', (req, res) => {
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    }

    User
  	.findOne({
  		where: {
  			email: req.body.email
  		}
  	})
  	.then(entity => {
  		if (bcrypt.compareSync(req.body.password, entity.password)) {
  			res.send({
  				jwt: sign(entity.id),
          message: "correct"
  			})
  		}
  		else {
  			res.status(400).send({
  				message: 'Password was incorrect'
  			})
  		}
  	})
  	.catch(err => {
  		console.error(err)
  		res.status(500).send({
  			message: 'Something went wrong'
  		})
  	})
  })

  

router.get('/secret', (req, res) => {
	if (req.user) {
		res.send({
			message: `Welcome, you should be the user with email ${req.user.email}`
		})
	}
	else {
		res.status(401).send({
			message: 'Please login!'
		})
	}
})




module.exports = router

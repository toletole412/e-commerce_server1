const Router = require('express').Router
const Product = require('./model')
const router = new Router()

const requireUser = (req, res, next) => {
	if (req.user) next()
	else res.status(401).send({
		message: 'Please login'
	})
}

router.get('/products', (req, res) => {
  const products = Product
    .findAll({
      attributes: ['id', 'name', 'price']
    })
    .then((products) => {
      res.json(products)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the players. Please try again' })
    })
})

router.get('/products/:id', (req, res) => {
  const products = Product
    .findById(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product)
      } else {
        res.status(404)
        res.json({ message: 'Product not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the product. Please try again' })
    })
})

router.patch('/products/:id', (req, res) => {
  const products = Product
    .findById(req.params.id)
    .then((product) => {
      if (product) {
        product.price = req.body.price
        product
          .save()
          .then((updatedProduct) => {
            res.json(updatedProduct)
          })
          .catch((err) => {
            res.status(422)
            res.json({ message: err.message })
          })
      } else {
        res.status(404)
        res.json({ message: 'Product not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the product. Please try again' })
    })
})

router.post('/products', (req, res) => {
  const product = req.body

  Product.create(product)
    .then(entity => {
      res.status(201)
      res.json(entity)
  })
    .catch(err => {
      res.status(422)
      res.json({ message: err.message })
    })
  })

router.put('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body

  Product.findById(req.params.id)
    .then(entity => {
      return entity.update(updates)
    })
    .then(final => {
      res.send(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

router.delete('/products/:id', (req, res) => {
  const productId = Number(req.params.id)

  Product.findById(req.params.id)
  .then(entity => {
    return entity.destroy()
  })
  .then(_ => {
    res.send({
      message: 'The product was deleted succesfully'
    })
  })
  .catch(error => {
    res.status(500).send({
      message: `Something went wrong`,
      error
    })
  })
})

router.post('/products', requireUser, (req, res) => {
  const product = req.body

  Product.create(product).then(entity => {
    res.status(201).send(entity)
  })
})

module.exports = router

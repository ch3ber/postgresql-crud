import express from 'express'

import { productService } from './../services/product.service.js'
import validatorHandler from './../middlewares/validator.handler.js'
import { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } from './../schemas/product.schema.js'

const router = express.Router()

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      console.log(req.query)
      const products = await productService.find(req.query)
      res.json(products)
    } catch (error) {
      next(error)
    }
  })

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await productService.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await productService.create(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await productService.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await productService.delete(id)
      res.status(201).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

export default router

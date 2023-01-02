// @ts-check
import Joi from 'joi'

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()
const description = Joi.string().min(10)

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required()
})

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description
})

const getProductSchema = Joi.object({
  id: id.required()
})

export default { createProductSchema, updateProductSchema, getProductSchema }

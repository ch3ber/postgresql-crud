// @ts-check
import boom from '@hapi/boom'

/** @typedef {import('../node_modules/joi/lib/index.d.js').ObjectSchema} JoiObject */

/**
 * Validate a schema with Joi module
 * @function validatorHandler
 * @param {JoiObject} schema - Schema generated by Joi
 * @param {string} property - property to acces in the request
 * @returns {Function} middleware function
 */
function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error.message))
    }
    next()
  }
}

export default validatorHandler

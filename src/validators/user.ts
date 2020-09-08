/**
 * @joi: https://github.com/sideway/joi/blob/master/API.md
 * @express-joi-validation: https://www.npmjs.com/package/express-joi-validation#api
 */

import * as Joi from '@hapi/joi';


/**
 * Add user validation schema.
 */
export const addUserSchema = Joi.object({
    user: {
        login: Joi.string()
        .alphanum()
        .required(),

        password: Joi.string()
            .alphanum()
            .required(),

        // @TODO: repeat_password: Joi.ref('password'),

        age: Joi.number()
            .integer()
            .min(4)
            .max(130)
            .required(),
    }
});

/**
 * Add user validation schema.
 */
export const editUserSchema = Joi.object({
    user: {
        id: Joi.number()
            .integer()
            .required(),

        login: Joi.string()
        .alphanum()
        .required(),

        password: Joi.string()
            .alphanum()
            .required(),

        // @TODO: repeat_password: Joi.ref('password'),

        age: Joi.number()
            .integer()
            .min(4)
            .max(130)
            .required(),

        isDeleted: Joi.boolean()
            .required()
    }
});

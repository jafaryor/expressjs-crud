import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import url from 'url';
import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError, userNotFoundError, queryParamMissingError } from '@shared/constants';
import { createValidator } from 'express-joi-validation';
import { addUserSchema, editUserSchema } from 'src/validators/user';


const router = Router();
const userDao = new UserDao();
const validator = createValidator({
    statusCode: BAD_REQUEST,
    passError: false,
});


/******************************************************************************
 * Get All Users - "GET /api/users/"
 ******************************************************************************/
router.get('/', async (req: Request, res: Response) => {
    const users = await userDao.getAll();

    return res.status(OK).json({users});
});


/******************************************************************************
 * Auto Suggest - "GET /api/users/suggest?login&limit"
 * Note: If this get handler is set after "GET /api/user/:id",
 *       hen "GET /api/users/suggest" would be handled by wrong handler.
 *       The order of registered handlers is important.
 ******************************************************************************/
router.get('/suggest', async (req: Request, res: Response) => {
    const { login, limit } = url.parse(req.url, true).query;

    if (!login) {
        return res.status(BAD_REQUEST).json({
            error: queryParamMissingError,
        });
    }

    const users = await userDao.getAutoSuggestUsers(login as string, Number(limit));

    return res.status(OK).json({users});
});


/******************************************************************************
 * Get Specific User - "GET /api/user/:id"
 ******************************************************************************/
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const user = await userDao.getOne(Number(id));

    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: userNotFoundError,
        });
    }

    return res.status(OK).json({user});
});



/******************************************************************************
 * Add One - "POST /api/users/"
 ******************************************************************************/
router.post('/', validator.body(addUserSchema), async (req: Request, res: Response) => {
    const { user } = req.body;

    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    await userDao.add(user);

    return res.status(CREATED).end();
});


/******************************************************************************
 * Update - "PUT /api/users/"
 ******************************************************************************/
router.put('/', validator.body(editUserSchema), async (req: Request, res: Response) => {
    const { user } = req.body;

    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    user.id = Number(user.id);
    await userDao.update(user);

    return res.status(OK).end();
});


/******************************************************************************
 * Delete - "DELETE /api/users/:id"
 ******************************************************************************/
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;

    await userDao.delete(Number(id));

    return res.status(OK).end();
});


/******************************************************************************
 * Soft Delete - "DELETE /api/users/soft-delete/:id"
 ******************************************************************************/
router.delete('/soft-delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;

    await userDao.softDelete(Number(id));

    return res.status(OK).end();
});


/******************************************************************************
 * Exports
 ******************************************************************************/
export default router;

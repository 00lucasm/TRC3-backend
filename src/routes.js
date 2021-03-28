import { Router } from 'express'

import UserController from './app/controllers/UserController'

const routes = new Router();

routes.get("/teste", UserController.test)

export default routes;
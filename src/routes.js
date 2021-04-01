import { Router } from 'express'

import UserController from './app/controllers/UserController'

const routes = new Router();

routes.post("/users", UserController.store);
routes.get("/users", UserController.index);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

export default routes;
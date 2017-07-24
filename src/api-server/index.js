import {Router} from 'express'
import setupRoutes from './setup-routes.js'

export default () => {
  const routers = {rest: Router(), ws: Router()}
  setupRoutes(routers)
  return routers;
}

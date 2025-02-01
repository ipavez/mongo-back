import { Router } from 'express';
import userModel from '../models/user.model.js';
const apiRouter = Router();

apiRouter.get('/' , async (req, res) => {
    try {
    // const {email} = req.params;
      const users = await userModel.find({});
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
    }
  });


export default apiRouter;
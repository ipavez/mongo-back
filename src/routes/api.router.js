import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/' , async(req, res) => {
    res.send('zarpao');
});

export default apiRouter;
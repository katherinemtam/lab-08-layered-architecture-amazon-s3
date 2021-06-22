import { Router } from 'express';
import Profile from '../models/Profile.js';

export default Router()
  .post('/', (req, res, next) => {
    Profile.insert(req.body)
      .then(profile => res.send(profile))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Profile.findById(req.params.id)
      .then(profile => res.send(profile))  
      .catch(next);
  })
  
  
;

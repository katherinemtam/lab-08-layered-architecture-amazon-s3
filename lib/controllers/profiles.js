import { Router } from 'express';
import Profile from '../models/Profile.js';
import ProfileService from '../services/ProfileService.js';

export default Router()
  .post('/', (req, res, next) => {
    ProfileService.create(req.body)
      .then(profile => res.send(profile))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Profile.findById(req.params.id)
      .then(profile => res.send(profile))  
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Profile.findAll()
      .then(profile => res.send(profile))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {

    Profile.update(req.body, req.params.id)
      .then(profile => res.send(profile))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {

    Profile.delete(req.params.id)
      .then(profile => res.send(profile))
      .catch(next);
  })
  
  
;

const express = require('express');
const router = express.Router();
const Celebrity = require('./../models/celebrity');

router.get('/create', (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/create/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      if (celebrity === null) {
        const error = new Error('Page does not exist.');
        error.status = 404;
        next(error);
      } else {
        res.render('celebrities/show', { celebrity: celebrity });
      }
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        error.status = 404;
      }
      next(error);
    });
});

module.exports = router;

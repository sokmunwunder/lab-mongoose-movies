const express = require('express');
const router = express.Router();
const Celebrity = require('./../models/celebrity');

//router.get('/create', (req, res, next) => {   => To be changed back
router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })

    // {celebrities} - an array of the celebrities
    /*.then((celebrities) => {
      res.render('celebrities/show', { celebrities });
    })*/
    .catch((error) => {
      next(error);
    });
});

//router.get('/', (req, res, next) => {
/*router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    /*.then((celebrities) => {
      res.render('celebrities/create', { celebrities });
    })*/
/*.catch((error) => {
      next(error);
    });
});*/

/*router.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});*/

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

//router.get('/create/:id', (req, res, next) => { = > To be changed
router.get('/celebrities/:id', (req, res, next) => {
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

/*router.post('/celebrities', (req, res, next) => {
  const data = req.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  }).then((celebrity) => {
    if (celebrity === null) {
      const error = new Error('There is an error');
      error.status = 404;
      next(error);
      res.render('/celebrities/create');
    } else {
      res.redirect('/celebrities', { celebrity: celebrity });
    }
  });
});*/

router.post('/celebrities', (req, res, next) => {
  const data = req.body;
  const celebrity = new Celebrity({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  });
  celebrity
    .save()
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit');
    })
    .catch((error) => {
      next(error);
    });
});

/*router.get('/celebrities/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      if (celebrity === null) {
        const error = new Error('Celebrity does not exist.');
        error.status = 404;
        next(error);
      } else {
        res.render('celebrities/edit', { celebrity: celebrity });
      }
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        error.status = 404;
      }
      next(error);
    });
});*/

module.exports = router;

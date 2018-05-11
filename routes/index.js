const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  response.render('index', {
    title: 'CSC 675 - Project',
    tableName: ''
  });
});

module.exports = router;
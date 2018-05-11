const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  let sql = 'SELECT * FROM coaches';
  let query = request.app.db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    response.send(result);
  });
});

module.exports = router;
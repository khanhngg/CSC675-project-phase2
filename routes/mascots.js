const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  let sql = 'SELECT * FROM mascots';
  let query = request.app.db.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    response.render('table.ejs', {
      title: 'CSC 675 - Project',
      tableName: 'Mascots',
      result: result
    });
  });
});

module.exports = router;
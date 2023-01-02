

const { query } = require('express');
const express = require('express');
const router = express.Router();
const queryData = require('./gql.service');

router.post('/', async (req, res, next) => {
  const source = {
    ...req.body,
    query : req.body.query.trim()
  }
  const output =  await queryData(source.query, source.variables);
  res.send(output);
});

module.exports = router;
const e = require('express');
const express = require('express');
const router = express.Router();
const util = require('../../util');
const fs = require('fs');

router.get('/', async (req, res, next) => {
	res.status(200).json({ dictionary: util.dict });
});

module.exports = router;

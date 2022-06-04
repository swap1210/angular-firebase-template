const e = require('express');
const express = require('express');
const router = express.Router();
const util = require('../../util');
const fs = require('fs');

router.get('/', async (req, res, next) => {
	let rawdata = fs.readFileSync('models/calculated-dictionary.json');
	util.dict = JSON.parse(rawdata);

	res.status(200).json({ msg: 'Successfully Reloaded' });
});

module.exports = router;

const e = require('express');
const express = require('express');
const router = express.Router();
const util = require('../../util');
const fs = require('fs');

router.get('/', async (req, res, next) => {
	if (Object.keys(util.dict).length == 0) {
		res
			.status(400)
			.json({ msg: 'Bad Request, expected name parameter in body' });
	} else {
		fs.writeFile(
			'models/calculated-dictionary.json',
			JSON.stringify(util.dict),
			(err) => {
				if (err) throw err;
				res.status(200).json({ msg: 'Successfully Reloaded' });
				console.log('Data written to file');
			}
		);
	}
});

module.exports = router;

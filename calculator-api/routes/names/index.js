const e = require('express');
const express = require('express');
const router = express.Router();
const util = require('../../util');

router.get('/', async (req, res, next) => {
	if (
		!req.body ||
		!req.body.prefix ||
		!req.body.suffix ||
		!req.body.target_soul_number
	) {
		res.status(400).json({
			msg: 'Bad Request, expected prefix(*required), suffix(*required) and tolerance(*optional) parameter in body',
		});
	} else {
		final = [];
		//IS: is space needed to be calculated as its value is always 0
		existing_SoulUrge = util.calculateSoulUrge(
			req.body.prefix + '  ' + req.body.suffix
		);

		final.put({});

		// final = {
		// 	soul_number: util.calculateSoulUrge(req.body.name),
		// 	destiny_number: util.calculateDestiny(req.body.name),
		// 	personaly_number: calculatePersonality(req.body.name),
		// };

		res.status(200).json(final);
	}
});

module.exports = router;

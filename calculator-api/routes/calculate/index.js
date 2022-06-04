const e = require('express');
const express = require('express');
const router = express.Router();
const util = require('../../util');
const fs = require('fs');

router.get('/', async (req, res, next) => {
	if (!req.body || !req.body.name) {
		res
			.status(400)
			.json({ msg: 'Bad Request, expected name parameter in body' });
	}
	if (Object.keys(util.dict).length === 0) {
		res
			.status(400)
			.json({ msg: 'Bad Request, admin has not loaded the dictionary' });
	} else {
		calc = {
			soul_number: util.calculateSoulUrge(req.body.name),
			destiny_number: util.calculateDestiny(req.body.name),
			personaly_number: calculatePersonality(req.body.name),
		};

		dict_data = util.dict;
		console.log('dict_data', dict_data);
		// let rawdata = fs.readFileSync('models/calculated-dictionary.json');

		//log frequency of the word calculated
		if (!dict_data.frequency[req.body.name.toLowerCase()]) {
			dict_data.frequency[req.body.name.toLowerCase()] = 1;
		} else {
			dict_data.frequency[req.body.name.toLowerCase()]++;
		}

		dict_data.soul_number[calc.soul_number][
			req.body.name.toLowerCase()
		] = false;
		dict_data.destiny_number[calc.destiny_number][
			req.body.name.toLowerCase()
		] = false;
		dict_data.personaly_number[calc.personaly_number][
			req.body.name.toLowerCase()
		] = false;

		console.log('dict_data', dict_data);

		res.status(200).json(calc);
		// fs.writeFile(
		// 	'models/calculated-dictionary.json',
		// 	JSON.stringify(dict_data),
		// 	(err) => {
		// 		if (err) throw err;
		// 		res.status(200).json(calc);
		// 		console.log('Data written to file');
		// 	}
		// );
	}
});

module.exports = router;

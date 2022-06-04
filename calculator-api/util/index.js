const charToVal = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 8,
	g: 3,
	h: 5,
	i: 1,
	j: 1,
	k: 2,
	l: 3,
	m: 4,
	n: 5,
	o: 7,
	p: 8,
	q: 1,
	r: 2,
	s: 3,
	t: 4,
	u: 6,
	v: 6,
	w: 5,
	x: 5,
	y: 1,
	z: 7,
};

let dict = {};

calculateDestiny = (fullName) => {
	const names = fullName.toLowerCase().split(' ');

	let result = names.reduce((total, name) => {
		let sum = 0;
		for (let i = 0; i < name.length; i++) {
			sum += charToVal[name.charAt(i)];
		}
		return reduceNumber(sum) + total;
	}, 0);

	return reduceNumber(result);
};

calculateSoulUrge = (fullName) => {
	const regexp = /[aeiou]/gi;

	if (!fullName.toLowerCase().match(regexp)) {
		return 0;
	}

	const result = fullName
		.toLowerCase()
		.match(regexp)
		.reduce((total, letter) => total + charToVal[letter], 0);

	return reduceNumber(result);
};

calculatePersonality = (fullName) => {
	const regexp = /[^aeiou\s]/gi;

	if (!fullName.toLowerCase().match(regexp)) {
		return 0;
	}

	const result = fullName
		.toLowerCase()
		.match(regexp)
		.reduce((total, letter) => total + charToVal[letter], 0);

	return reduceNumber(result);
};

reduceNumber = (num) => {
	// console.log('Calling reducenum for', num);
	if (num < 10 || num === 11 || num === 22 || num === 33) {
		return num;
	}

	let digit = num;
	num = 0;
	while (digit !== 0) {
		num += digit % 10;
		digit = Math.floor(digit / 10);
	}

	return reduceNumber(num);
};

module.exports = {
	calculateDestiny,
	calculateSoulUrge,
	calculatePersonality,
	dict,
};

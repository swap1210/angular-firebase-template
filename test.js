charToVal = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 1,
	k: 2,
	l: 3,
	m: 4,
	n: 5,
	o: 6,
	p: 7,
	q: 8,
	r: 9,
	s: 1,
	t: 2,
	u: 3,
	v: 4,
	w: 5,
	x: 6,
	y: 7,
	z: 8,
};
reduceNumber = (num) => {
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

console.log(reduceNumber(66));

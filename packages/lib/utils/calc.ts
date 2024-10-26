function shuffle(arr: any[]) {
	return arr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
}

function toFixedDigit(num: number, digit = 2, filler = '0') {
	const zero = filler.repeat(digit);
	return (num + '').padStart(digit, zero);
}

function capitalize(str: string) {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export { shuffle, capitalize, toFixedDigit };

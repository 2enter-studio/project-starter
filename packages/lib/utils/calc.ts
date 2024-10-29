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

function randomItem<T>(arr: T[], targetAmount = 1, canRepeat = true) {
	targetAmount = Math.min(targetAmount, arr.length);
	if (targetAmount === arr.length) return [...arr];

	const result: T[] = [];
	const pickedIndex: number[] = [];

	for (let i = 0; i < targetAmount; i++) {
		let index = ~~(Math.random() * arr.length);

		if (!canRepeat) {
			while (pickedIndex.includes(index)) {
				index = ~~(Math.random() * arr.length);
			}
			pickedIndex.push(index);
		}

		result.push(arr[index]);
	}

	return result;
}

export { randomItem, shuffle, capitalize, toFixedDigit };

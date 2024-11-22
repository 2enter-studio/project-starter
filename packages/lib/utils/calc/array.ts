function shuffle(arr: any[]) {
	return arr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
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

export { shuffle, randomItem };

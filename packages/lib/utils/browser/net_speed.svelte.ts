import SpeedTest from '@cloudflare/speedtest';
import type { ConfigOptions, Results } from '@cloudflare/speedtest';

class SpeedTester {
	tester: SpeedTest;
	results = $state<Results>();

	constructor(args: { configs?: ConfigOptions; onFinish: (result: Results) => any }) {
		const { configs, onFinish } = args;
		this.tester = new SpeedTest({ ...configs });
		this.tester.onFinish = (results) => {
			this.results = results;
			onFinish(results);
		};
	}

	test() {
		if (!this.results) this.tester.play();
		else this.tester.restart();
	}
}

export { SpeedTester };

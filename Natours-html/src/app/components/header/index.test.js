import Header from './index';

describe('Header View', function() {
	beforeEach(() => {
		this.header = new Header();
	});

	it('Should run a few assertions', () => {
		expect(this.header).to.exist;
	});
});

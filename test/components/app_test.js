import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// Use describe to group togethet similar tests
describe('App', () => {
	let component;

	beforeEach(() => {
		component = renderComponent(App);
	});

	it('shows a comment box', () => {
		expect(component.find('.comment_box')).to.exist;
	});

	it('shows a comment list', () => {
		expect(component.find('.comment_list')).to.exist;
	});
});

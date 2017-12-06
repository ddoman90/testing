import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// ####### Set up testing environment to run like a browser in the command line
// window ---> global

// create basic HTML snippet (fake browser behaviour)
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

// force jquery to NOT to find DOM, just use this fake DOM
const $ = jquery(global.window);

// ####### renderComponent helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
	// rendered version of component
	// createStore second parameter stands for the initial state of redux store
	const componentInstance = TestUtils.renderIntoDocument(
		<Provider store={createStore(reducers, state)}>
			<ComponentClass {...props} />
		</Provider>
	);
	return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML wrapped with jquery
}

// ####### Build helper for simulating events
// defining a function which is accessible on each jquery wrapped object
$.fn.simulate = function(eventName, value) {
	if (value) {
		this.val(value);
	}
	TestUtils.Simulate[eventName](this[0]);
};

// ####### set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };

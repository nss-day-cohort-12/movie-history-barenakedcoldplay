'use strict';

MovieHistory.factory('store-variables', function () {
	let StoreVars = {};
	let variable = "";
	StoreVars.getVariable = () => variable
	StoreVars.setVariable = (value) => variable = value
	return StoreVars;
})
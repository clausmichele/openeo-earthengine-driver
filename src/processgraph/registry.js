const Utils = require('../utils');
const fse = require('fs-extra');
const path = require('path');
const { ProcessRegistry } = require('@openeo/js-processgraphs');

module.exports = class GeeProcessRegistry extends ProcessRegistry {

	constructor(serverContext) {
		super();
		this.serverContext = serverContext;
	}

	addFromFolder(folder) {
		fse.readdirSync(folder).forEach(file => {
			if (file.endsWith('.js')) {
				var id = path.basename(file, '.js');
				this.addFromFile(id);
			}
		});
		var num = Utils.size(this.namespace('backend'));
		console.info("Loaded " + num + " processes.");
		return Promise.resolve(num);
	}

	addFromFile(id) {
		var spec = require('../processes/' + id + '.json');
		delete spec.process_graph;
		this.add(spec, 'backend');
	}

	getServerContext() {
		return this.serverContext;
	}

};
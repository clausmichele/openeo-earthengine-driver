const Errors = require('../errors');
const { BaseProcess } = require('@openeo/js-processgraphs');

module.exports = class add_dimension extends BaseProcess {

	async execute(node) {
		var dc = node.getDataCube("data");
		var name = node.getArgument('name');
		var label = node.getArgument('label');
		var type = node.getArgument("type");

		if (dc.hasDimension(name)) {
			throw new Errors.DimensionExists({
				process: this.id,
				argument: 'name'
			});
		}

		var dimension = dc.addDimension(name, type);

		dimension.addValue(label);

		// TODO A Number value for label causes problems
		if (!Number.isInteger(label)) {
			dc.renameLabels(dimension, [label], ["#"]);
		}
		return dc;
	}

};
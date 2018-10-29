module.exports = {
	process_id: "get_collection",
	summary: "Selects a collection.",
	description: "Filters and selects a single collection provided by the back-end. The back-end provider decides which of the potential collections is the most relevant one to be selected.",
	parameters: {
		name: {
			description: "Filter by collection name",
			required: true,
			schema: {
				type: "string",
				examples: [
					"COPERNICUS/S2"
				]
			}
		}
	},
	returns: {
		description: "EO data",
		schema: {
			type: "object",
			format: "eodata"
		}
	},
	eeCode(args, req, res) {
		// ToDo: Check whether name is valid and data exists
		return ee.ImageCollection(args.name);
	}
};
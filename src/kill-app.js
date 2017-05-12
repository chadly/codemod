import { dirname } from "path";

export default function(fileInfo, api) {
	const { jscodeshift: j } = api;
	const { source, path } = fileInfo;

	const depth = howManyLevelsBack(dirname(path));
	const appPath = calculatePath(depth);

	return j(source)
		.find(j.Literal)
		.replaceWith(p => {
			if (p.parent.node.type != "ImportDeclaration") {
				return p.node;
			}

			if (!p.node.value.startsWith("app/")) {
				return p.node;
			}

			const absPath = p.node.value;
			const newPath = absPath.replace(/app\//, appPath);

			return j.literal(newPath);
		})
		.toSource();
}

function howManyLevelsBack(path) {
	const subpath = path.replace(/src\\amd/, "");
	return (subpath.match(/\\/g) || []).length;
}

function calculatePath(depth) {
	let path = "./";

	for (let i = 0; i < depth; i++) {
		path += "../";
	}

	return path;
}

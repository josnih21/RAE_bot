import { DefinitionEntity } from "../src/definition-entity";
import { manageDefinitionFormat } from "../src/definitions-formatter";

test("should return a definition with the expected format", () => {
	const aSetOfDefinitions = [new DefinitionEntity("cabesa", "huevo cosido")];

	const formattedDefinitions = manageDefinitionFormat(aSetOfDefinitions);

	const expectedResult =
		"📚 <i>" +
		aSetOfDefinitions[0].getType() +
		"</i>  <b>" +
		aSetOfDefinitions[0].getDefinition() +
		"</b>";

	expect(formattedDefinitions).toEqual(expectedResult);
});

import { DefinitionEntity } from "../definition-entity";
import { format } from "../definitions-formatter";
import { WordEntity } from "../word-entity";

test("should return a definition with the expected format", () => {
	const definitions = [new DefinitionEntity("cabesa", "huevo cosido")];
	const aWord = new WordEntity("cabesa", "01");

	const formattedDefinitions = format(aWord, definitions);

	const expectedResult = [
		"<b>" + `Definiciones para la palabra: ${aWord.text}` + "</b>\n\n",
		"📚 <i>" + definitions[0].getType() + "</i>  <b>" + definitions[0].getDefinition() + "</b>",
	];

	expect(formattedDefinitions).toEqual(expectedResult);
});

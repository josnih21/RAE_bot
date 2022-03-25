import { DefinitionEntity } from "../definition-entity";
import {manageDefinitionFormat} from "../definitions-formatter";
import {WordEntity} from "../word-entity";

test("should return a definition with the expected format", () => {
	const aSetOfDefinitions = [new DefinitionEntity("cabesa", "huevo cosido")];
	const aMatchingWord = new WordEntity( "cabesa", "01")


	const formattedDefinitions = manageDefinitionFormat(aMatchingWord,aSetOfDefinitions);

	const expectedResult =
		"<b>"+`Definiciones para la palabra: ${aMatchingWord.text}`+ "</b>\n\n" +
		"📚 <i>" + aSetOfDefinitions[0].getType() + "</i>  <b>" + aSetOfDefinitions[0].getDefinition() + "</b>";

	expect(formattedDefinitions).toEqual(expectedResult);
});


import { DefinitionEntity } from "./definition-entity";
import { WordEntity } from "./word-entity";

export const format = (matchingWord: WordEntity, definitions: DefinitionEntity[]) => {
	const headerMessage = `Definiciones para la palabra: ${matchingWord.text}` + "\n\n";
	const formattedDefinitions = definitions
		.map(
			(definition) =>
				"📚 <i>" + definition.getType().concat("</i>  <b>").concat(definition.getDefinition()).concat("</b>")
		)
		.reduce((acc, formattedDefinition) => acc.concat("\n").concat(formattedDefinition));
	return [headerMessage, formattedDefinitions];
};

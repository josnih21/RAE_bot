import { DefinitionEntity } from "./definition-entity";

export const manageDefinitionFormat = (matchingWord: String, definitions: DefinitionEntity[]) => {
	const headerMessage = "<b>"+`Definiciones para la palabra: ${matchingWord}`+ "</b>\n\n"
	const formattedDefinitions =  definitions
		.map(
			(definition) =>
				"📚 <i>" + definition.getType().concat("</i>  <b>").concat(definition.getDefinition()).concat("</b>")
		)
		.reduce((acc, formattedDefinition) => acc.concat("\n").concat(formattedDefinition))
	return headerMessage + formattedDefinitions
}

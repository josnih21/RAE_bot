import { DefinitionEntity } from "./definition-entity";

export const manageDefinitionFormat = (definitions: DefinitionEntity[]) => {
	return definitions
		.map(
			(definition) =>
				"📚 <i>" +
				definition
					.getType()
					.concat("</i>  <b>")
					.concat(definition.getDefinition())
					.concat("</b>")
		)
		.reduce((acc, formattedDefinition) =>
			acc.concat("\n").concat(formattedDefinition)
		);
};

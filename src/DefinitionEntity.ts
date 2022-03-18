import {Definition as RaeApiDefinition} from "rae-api" ;

export class DefinitionEntity {
	readonly type: string
	readonly definition: string

	constructor(type: string, definition: string) {
		this.type = type
		this.definition = definition
	}

	static from(definition: RaeApiDefinition) {
		return new DefinitionEntity(definition.getType(), definition.getDefinition())
	}

	getType() {
		return this.type
	}

	getDefinition() {
		return this.definition
	}
}

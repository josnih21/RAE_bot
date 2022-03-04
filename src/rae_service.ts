import {RAE} from "rae-api";
import {Definition} from "./Definition";

export interface DefinitionService{
	findDefinitionsFor(word: string): Promise<Definition[]>
} //TODO: Check this

export class RaeApiDefinitionService implements DefinitionService{
	raeApi: RAE

	constructor(raeApi: RAE) {
		this.raeApi = raeApi
	}

	findDefinitionsFor(word: string) {
		return this.raeApi.searchWord(word)
			.then((response) => this.raeApi.fetchWord(response.getRes()[0].getId()))
			.then((result) => result.getDefinitions())
			.then((result) => result.map((value) => Definition.from(value)))
			.catch((error) => {
				throw error
			})
	}
}

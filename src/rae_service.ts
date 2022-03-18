import {RAE} from "rae-api";
import {DefinitionEntity} from "./DefinitionEntity";

export interface DefinitionService {
	findDefinitionsFor(word: string): Promise<DefinitionEntity[]>
}

export class RaeApiDefinitionService implements DefinitionService {
	raeApi: RAE

	constructor(raeApi: RAE) {
		this.raeApi = raeApi
	}

	findDefinitionsFor(word: string) {
		return this.raeApi.searchWord(word)
			.then((matchingWords) => {
				let wordId = matchingWords.getRes()[0].getId();
				return this.raeApi.fetchWord(wordId)
			})
			.then((response) => response.getDefinitions())
			.then((wordDefinitions) => wordDefinitions.map((value) => DefinitionEntity.from(value)))
			.catch((error) => {
				throw error
			})
	}
}

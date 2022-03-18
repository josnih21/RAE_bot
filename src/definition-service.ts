import {RAE} from "rae-api";
import {DefinitionEntity} from "./definition-entity";
import {NotDefinitionFoundError} from "./errors";

export interface DefinitionService {
	findDefinitionsFor(word: string): Promise<DefinitionEntity[]>
	getFirstMatchingWord(word: string): Promise<String>
}

export class RaeApiDefinitionService implements DefinitionService {
	raeApi: RAE;

	constructor(raeApi: RAE) {
		this.raeApi = raeApi;
	}

	getFirstMatchingWord(word: string) {
		return this.raeApi.searchWord(word).then((matchingWords) => matchingWords.getRes()[0].getHeader())
	}

	findDefinitionsFor(word: string) {
		return this.raeApi
			.searchWord(word)
			.then((matchingWords) => {
				let wordId = matchingWords.getRes()[0].getId();
				return this.raeApi.fetchWord(wordId);
			})
			.then((response) => response.getDefinitions())
			.then((wordDefinitions) => wordDefinitions.map((value) => DefinitionEntity.from(value)))
			.catch(() => {
				throw new NotDefinitionFoundError(word);
			});
	}
}

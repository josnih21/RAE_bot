import { RAE } from "rae-api";
import { DefinitionEntity } from "./definition-entity";
import { NotDefinitionFoundError } from "./errors";
import { WordEntity } from "./word-entity";

export interface DefinitionService {
	findDefinitionsFor(word: string): Promise<DefinitionEntity[]>;
	getFirstMatchingWord(word: string): Promise<WordEntity>;
}

export class RaeApiDefinitionService implements DefinitionService {
	raeApi: RAE;

	constructor(raeApi: RAE) {
		this.raeApi = raeApi;
	}

	//TODO: This will be implemented to be able to fetch any of the possible matching words
	getFirstMatchingWord(word: string) {
		return this.raeApi.searchWord(word).then((matchingWords) => {
			const id = matchingWords.getRes()[0].getId();
			const matchedWord = matchingWords.getRes()[0].getHeader();
			return new WordEntity(matchedWord, id);
		});
	}

	findDefinitionsFor(word: string) {
		return this.getFirstMatchingWord(word)
			.then((matchingWord) => {
				return this.raeApi.fetchWord(matchingWord.id);
			})
			.then((response) => response.getDefinitions())
			.then((wordDefinitions) => wordDefinitions.map((value) => DefinitionEntity.from(value)))
			.catch(() => {
				throw new NotDefinitionFoundError(word);
			});
	}
}

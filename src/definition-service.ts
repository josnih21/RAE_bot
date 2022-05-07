import {RAE, Res} from "rae-api";
import {DefinitionEntity} from "./definition-entity";
import {NotDefinitionFoundError, NotMatchingWordFoundError} from "./errors";
import {WordEntity} from "./word-entity";

export interface DefinitionService {
	findDefinitionsFor(word: string): Promise<DefinitionEntity[]>
	getFirstMatchingWord(word: string): Promise<WordEntity>
	getMatchingWords(word: string): Promise<WordEntity[]>
}

export class RaeApiDefinitionService implements DefinitionService {
	raeApi: RAE;

	constructor(raeApi: RAE) {
		this.raeApi = raeApi;
	}

	getFirstMatchingWord(word: string) {
		return this.raeApi
			.searchWord(word)
			.then((matchingWordsResponse) => {
				const matchedWord = matchingWordsResponse.getRes()[0].getHeader();
				const id = matchingWordsResponse.getRes()[0].getId();
				return new WordEntity(matchedWord, id);
			})
			.catch(() => {
				throw new NotMatchingWordFoundError(word);
			});
	}

	getMatchingWords(word: string) {
		return this.raeApi
			.searchWord(word)
			.then((matchingWordsResponse) => {
				let matchingWords: Res[] = matchingWordsResponse.getRes();
				return matchingWords.map((word) => new WordEntity(word.getHeader(), word.getId()));
			})
			.catch(() => {
				throw new NotDefinitionFoundError(word);
			})
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

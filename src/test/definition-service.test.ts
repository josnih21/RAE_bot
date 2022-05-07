import { DefinitionService, RaeApiDefinitionService } from "../definition-service";
import { RAE } from "rae-api";
import { NotDefinitionFoundError, NotMatchingWordFoundError } from "../errors";
import { DefinitionEntity } from "../definition-entity";
import {WordEntity} from "../word-entity";

const raeApi = new RAE();
const definitionService: DefinitionService = new RaeApiDefinitionService(raeApi);

test("should throw an error when no definition found", async () => {
	const anUnreachableWord = "sdgdsgdsgdsgsdg";

	const expectedResult = () => definitionService.findDefinitionsFor(anUnreachableWord);

	await expect(expectedResult).rejects.toThrow(NotDefinitionFoundError);
});

test("should throw an error when there are no matches for a given word", async () => {
	const aWordWithoutMatches = "ioerjslfkwer";

	const expectedResult = () => definitionService.getFirstMatchingWord(aWordWithoutMatches);

	await expect(expectedResult).rejects.toThrow(NotMatchingWordFoundError);
});

test("should return a matching word given a valid word to search", async () => {
	const aWord = "hola"

	const matchingWord = definitionService.getFirstMatchingWord(aWord)

	const expectedResult = new WordEntity("hola", "KYtLWBc")

	await expect(matchingWord).resolves.toStrictEqual(expectedResult)
})

test("should return a list of matching words given a valid word to search", async () => {
	const aWord = "hola"

	const matchingWord = definitionService.getMatchingWords(aWord)

	const expectedResult = [new WordEntity("hola", "KYtLWBc")]

	await expect(matchingWord).resolves.toStrictEqual(expectedResult)
})

test("should return a definition given a valid word", async () => {
	const aWord = "hola";

	const definitions = definitionService.findDefinitionsFor(aWord);

	const expectedResult = [
		new DefinitionEntity("interjección", "U. como salutación familiar."),
		new DefinitionEntity(
			"interjección",
			"poco us. U. para denotar extrañeza, placentera o desagradable. U. también repetida."
		),
		new DefinitionEntity("interjección", "desus. Era u. para llamar a los inferiores."),
	];

	await expect(definitions).resolves.toStrictEqual(expectedResult);
});

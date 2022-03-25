import { DefinitionService, RaeApiDefinitionService } from "../definition-service";
import { RAE } from "rae-api";
import { NotDefinitionFoundError } from "../errors";
import { DefinitionEntity } from "../definition-entity";

const raeApi = new RAE();
const definitionService: DefinitionService = new RaeApiDefinitionService(raeApi);

test("should throw an error when no definition found", () => {
	const anUnreachableWord: string = "sdgdsgdsgdsgsdg";

	const expectedResult = () => definitionService.findDefinitionsFor(anUnreachableWord);

	expect(expectedResult).rejects.toThrow(NotDefinitionFoundError);
});

test("should return a definition given a valid word", () => {
	const aWord: string = "hola";

	const definitions = definitionService.findDefinitionsFor(aWord);

	const expectedResult = [
		new DefinitionEntity("interjección", "U. como salutación familiar."),
		new DefinitionEntity(
			"interjección",
			"poco us. U. para denotar extrañeza, placentera o desagradable. U. también repetida."
		),
		new DefinitionEntity("interjección", "desus. Era u. para llamar a los inferiores."),
	];

	expect(definitions).resolves.toStrictEqual(expectedResult);
});

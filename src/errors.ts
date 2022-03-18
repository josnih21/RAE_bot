export class NotDefinitionFoundError extends Error {
	constructor(word: string) {
		super(`No he encontrado una definición para ${word}`);
		this.name = "NotDefinitionFoundError";
	}
}

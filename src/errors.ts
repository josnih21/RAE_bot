export class NotDefinitionFoundError extends Error {
	constructor(word: string) {
		super(`No he encontrado una definición para ${word}`);
		this.name = "NotDefinitionFoundError";
	}
}

export class NotMatchingWordFoundError extends Error {
	constructor(word: string) {
		super(`No he encontrado una coincidencia para ${word}`);
		this.name = "NotMatchingWordFoundError";
	}
}

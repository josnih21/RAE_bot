export class NotDefinitionFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotDefinitionFoundError";
	}
}

export const errorMessage = (word: String) =>
	`No he encontrado una definición para ${word}`;

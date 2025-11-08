export class AddNotesInDBError extends Error {
	public cause?: unknown;
	constructor(message: string, options?: { cause?: unknown }) {
		super(message);
		this.name = "AddNotesInDBError";
		if (options?.cause) this.cause = options.cause;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class AddNotesError extends Error {
	public cause?: unknown;
	constructor(message: string, options?: { cause?: unknown }) {
		super(message);
		this.name = "AddNotesError";
		if (options?.cause) this.cause = options.cause;
		Error.captureStackTrace(this, this.constructor);
	}
}

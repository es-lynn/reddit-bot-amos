export class StringUtil {

	private static is_number(str: string): boolean {
		return !isNaN(str as any)
	}

	// FIXME: Empty string is parsed as 0
	static to_number(str: string): number {
		if (!StringUtil.is_number(str)) {
			throw new TypeError(`StringUtil: Unable to parse ${str} to number`)
		}
		return Number(str)
	}
}
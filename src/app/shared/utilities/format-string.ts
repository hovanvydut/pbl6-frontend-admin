export class FormatString {
	public static capitalizeFirstLetter(input: string) {
		const value = input.toLowerCase().trim() || '';
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}

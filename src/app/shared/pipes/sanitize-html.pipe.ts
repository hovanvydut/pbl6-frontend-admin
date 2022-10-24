import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
	name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {
	}

	transform(value: string): any {
		if (!value) return '';
		const indexOfOpenBody = value.indexOf('<body');
		const indexOfCloseBody = value.indexOf(`/body>`);
		if (indexOfCloseBody !== -1 && indexOfOpenBody !== -1) {
			value = value.substring(indexOfOpenBody, indexOfCloseBody - 1);
		}

		return this.sanitizer.bypassSecurityTrustHtml(value);
	}
}

import { Injectable } from '@angular/core';

interface SvgIcon {
	name: string;
	data: string;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class SvgIconsRegistryService {
	private registry = new Map<string, string>();

	public registerIcons(icons: SvgIcon[]): void {
		icons.forEach((icon: SvgIcon) => this.registry.set(icon.name, icon.data));
	}

	public getIcon(iconName: string): string | undefined {
		if (!this.registry.has(iconName)) {
			console.warn(
				`We could not find the Eldesk Icon with the name ${iconName}, did you add it to the Icon registry?`
			);
		}
		return this.registry.get(iconName);
	}
}

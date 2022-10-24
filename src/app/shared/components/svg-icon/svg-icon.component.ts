import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	Inject,
	Input,
	Optional,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SvgIconsRegistryService } from '@app/shared/services/svg-icon-registry.service';
//

@Component({
	selector: 'app-svg-icon',
	template: '<ng-content></ng-content>',
	styleUrls: ['./svg-icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {

  @HostBinding('style.width') _widthProperty: string;
  @HostBinding('style.color') _colorProperty: string;

  private _name: string;
  @Input()
  get name(): string {
      return this._name;
  }

  set name(value: string) {
      this._name = value;
      //
      this.generateIcon();
  }

  private _data: string;
  @Input()
  get data(): string {
      return this._data;
  }
  set data(data: string) {
      this._data = data;
      //
      this.generateIcon();
  }


  // Style
  @Input()
  set width(value: number) {
      this._widthProperty = value + 'px' ?? null;
  }

  @Input()
  set color(value: string) {
      this._colorProperty = value ?? null;
  }

  private _svgIcon: SVGElement;

  constructor(@Optional() @Inject(DOCUMENT) private _document: any,
              private _elementRef: ElementRef,
              private _svgIconRegistry: SvgIconsRegistryService) {
  }

  ngOnInit() {
  }

  private generateIcon() {
      if (this._svgIcon) {
          this._elementRef.nativeElement.removeChild(this._svgIcon);
      }
      //
      const svgData: string = !!this.name
          ? this._svgIconRegistry.getIcon(this.name)
          : this.data
              ? this.data : null;
      //
      this._svgIcon = this.svgElementFromString(svgData);
      this._elementRef.nativeElement.appendChild(this._svgIcon);
  }

  private svgElementFromString(svgContent: string): SVGElement {
      if (!svgContent) {
          return this._document.createElementNS('http://www.w3.org/2000/svg', 'path');
      }
      //
      const div = this._document.createElement('div');
      div.innerHTML = svgContent;
      return div.querySelector('svg')
          || this._document.createElementNS('http://www.w3.org/2000/svg', 'path');
  }
}

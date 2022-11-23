import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
//pipes
import {
  LookupValuePipe,
  SanitizeHtmlPipe,
  StringToDatePipe,
  TimeAgoPipe
} from './pipes';
// material
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
// components
import { SwiperTemplateComponent } from './components/swiper-template/swiper-template.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { ZoomImageComponent } from './components/zoom-image/zoom-image.component';
import { CheckBoxListComponent } from './components/check-box-list/check-box-list.component';
import { CategoryExpansionComponent } from './components/category-expansion/category-expansion.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { TableComponent } from './components/table/table.component';
import {
  LineChartComponent,
  AreaChartComponent,
  BarChartComponent,
  PieChartComponent,
} from './components/chart';
import {
  FormDialogComponent,
  ConfirmDialogComponent
} from './components/dialog';
import { SvgIconsRegistryService } from './services/svg-icon-registry.service';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { ViewIconsComponent } from './components/view-icons/view-icons.component';
import { TextareaFieldComponent } from './components/form/textarea-field/textarea-field.component';
import { InputFieldComponent } from './components/form/input-field/input-field.component';
import { SelectFieldComponent } from './components/form/select-field/select-field.component';
import { ChipsFieldComponent } from './components/form/chips-field/chips-field.component';
import { ToggleFieldComponent } from './components/form/toggle-field/toggle-field.component';
import { AddressPipe } from './pipes/address.pipe';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

const COMPONENTS: any[] = [
  SvgIconComponent,
  SwiperTemplateComponent,
  ZoomImageComponent,
  CheckBoxListComponent,
  CategoryTreeComponent,
  CategoryExpansionComponent,
  TableComponent,
  AreaChartComponent,
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
  ConfirmDialogComponent,
  FormDialogComponent,
  ViewIconsComponent,
  InputFieldComponent,
  TextareaFieldComponent,
  SelectFieldComponent,
  ChipsFieldComponent,
  ToggleFieldComponent,
];

const MATERIALS: any[] = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
];

const PIPES = [
  StringToDatePipe,
  SanitizeHtmlPipe,
  TimeAgoPipe,
  LookupValuePipe
];

const SVG_ICONS = completeIconSet;

@NgModule({
  imports: [
    ...MATERIALS,
    CommonModule,
    SwiperModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    RouterModule.forChild([])
  ],
  exports: [...COMPONENTS, ...PIPES, ...MATERIALS, AddressPipe, UploadImageComponent],
  declarations: [...COMPONENTS, ...PIPES, AddressPipe, UploadImageComponent],
  providers: [
    SvgIconsRegistryService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class SharedModule {
  constructor(private svgIconRegistry: SvgIconsRegistryService) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}

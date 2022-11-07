export enum AppEnvironments {
  Local = 'local',
  Dev = 'dev',
  Prod = 'prod'
}

export enum Days {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export enum DateRangeTypes {
  Today = 'Today',
  LastSevenDays = 'Last 7 Days',
  ThisWeek = 'This Week',
  LastWeek = 'Last Week',
  ThisMonth = 'This Month',
  LastMonth = 'Last Month',
  LastThreeMonths = 'Last 3 Months',
  AllTime = 'All Time',
  Custom = 'Custom Range'
}

export enum DateFormatTypes {
  MDY = 'MM/dd/yyyy',
  DMY = 'dd/MM/yyyy',
  MMMDY = 'MMM/dd/yyyy',
  YMD = 'yyyy/MM/dd',
  YDM = 'yyyy/dd/MM',
}

export enum SortingTypes {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum InputType {
  Text = 'text',
  Number = 'number',
  Date = 'date',
  Time = 'time',
  DateTime = 'datetime',
  Email = 'email',
  Password = 'password',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Select = 'select',
  TextArea = 'textarea',
  File = 'file',
  Image = 'image',
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
  Range = 'range',
  Color = 'color',
  Url = 'url',
  Tel = 'tel',
}

export enum FieldType {
  Property = 'property',
  Textarea = 'textarea',
  Input = 'input',
  Select = 'select',
  Image = 'image',
  Toggle = 'toggle',
}

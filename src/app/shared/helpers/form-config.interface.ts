export interface FormConfig {
  name: string;
  type?: string;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  pattern?: string | RegExp;
}

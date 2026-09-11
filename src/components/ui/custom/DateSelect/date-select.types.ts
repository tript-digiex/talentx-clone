export type DateSelectProps = {
  name?: string;
  label?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  onBlur?: () => void;
  onValueChange: (value: string) => void;
};
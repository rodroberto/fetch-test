export enum InputType {
  CHECKBOX = "checkbox",
  EMAIL = "email",
  NUMBER = "number",
  TEXT = "text",
}

export interface InputProps {
  defaultChecked?: boolean;
  isDisabled?: boolean;
  label?: string;
  onChange?: (val: string | boolean) => void;
  placeholder?: string;
  type?: InputType;
  value?: string | number;
}

const Input = ({
  defaultChecked,
  isDisabled,
  label,
  onChange,
  placeholder,
  type = InputType.TEXT,
  value,
}: InputProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>{label}</span>
      <input
        defaultChecked={defaultChecked}
        style={{ marginBottom: "20px" }}
        disabled={isDisabled}
        onChange={(e) => onChange?.(type === InputType.CHECKBOX ? e.target.checked : e.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;

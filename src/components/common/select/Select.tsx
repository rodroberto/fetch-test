import Select from "react-select";

export type SelectOption = Record<string, string>;

interface SelectProps {
  isLoading?: boolean;
  isMulti: boolean;
  options: SelectOption[];
  onChange: (newValue: any) => void;
  value: SelectOption[];
}

const CustomSelect = ({
  isLoading,
  isMulti,
  options,
  onChange,
  value,
}: SelectProps) => {
  return (
    <Select
      isLoading={isLoading}
      isMulti={isMulti}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
};

export default CustomSelect;

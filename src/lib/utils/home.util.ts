import { SelectOption } from "../../components/common/select/Select";

export const selectOptionsMapper = (options: string[]): SelectOption[] => {
  return options.map((option) => ({
    label: option,
    value: option,
  }));
};

export const selectOptionToString = (options: SelectOption[]) =>
  options.map(({ value }) => value);

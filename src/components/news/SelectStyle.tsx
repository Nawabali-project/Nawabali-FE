import { StylesConfig, GroupBase, components } from 'react-select';
import { IoIosArrowDown } from 'react-icons/io';

interface OptionType {
  value: string;
  label: string;
}

export const getCustomSelectStyles = (
  width: string,
): StylesConfig<OptionType, false, GroupBase<OptionType>> => ({
  option: (provided) => ({
    ...provided,
    border: 'none',
    opacity: 0.9,
    fontSize: '12px',
  }),
  control: (provided) => ({
    ...provided,
    background: 'white',
    fontSize: '12px',
    width: width,
    minHeight: '25px',
    maxHeight: '25px',
    padding: 0,
    border: 'none',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '25px',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none',
  }),
});

export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoIosArrowDown color="black" />
    </components.DropdownIndicator>
  );
};

import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

interface OptionSelectProps {
  label: string;
  value: string;
  options: Record<string, number>;
  onChange: (value: string) => void;
  labelMap?: Record<string, string>;
  dataTestId?: string;
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  label,
  value,
  options,
  onChange,
  labelMap = {},
  dataTestId,
}) => {
  return (
    <FormControl>
      <FormLabel fontWeight="semibold">{label}</FormLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="lg"
        data-testid={dataTestId}
      >
        {Object.keys(options).map((option) => (
          <option key={option} value={option}>
            {labelMap[option] || option} (${options[option]})
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default OptionSelect;

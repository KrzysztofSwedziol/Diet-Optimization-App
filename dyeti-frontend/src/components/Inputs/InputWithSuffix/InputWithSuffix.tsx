import InputWrapper from '../InputWrapper';
import { Shell, Suffix } from './InputWithSuffix.styles.ts';
import React from 'react';
import { InputField } from '../Input/Input.styles.ts';

type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  width?: string;
  suffix?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  disabled?: boolean;
};

const InputWithSuffix = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  width,
  suffix,
  textAlign,
  disabled,
}: Props) => (
  <InputWrapper label={label} error={error} width={width}>
    <Shell>
      <InputField
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        hasError={!!error}
        textAlign={textAlign}
      />
      {suffix && <Suffix>{suffix}</Suffix>}
    </Shell>
  </InputWrapper>
);

export default InputWithSuffix;

import { Picker, Pill, Knob } from './SegmentedPicker.styles.ts';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: readonly Option<T>[];
  value: T;
  onChange: (v: T) => void;
};

const SegmentedPicker = <T extends string>({ options, value, onChange }: Props<T>) => {
  const idx = Math.max(
    0,
    options.findIndex(o => o.value === value),
  );

  return (
    <Picker>
      {options.map(o => (
        <Pill key={o.value} $active={o.value === value} onClick={() => onChange(o.value)} type="button">
          {o.label}
        </Pill>
      ))}
      <Knob $index={idx} $count={options.length} aria-hidden />
    </Picker>
  );
};

export default SegmentedPicker;

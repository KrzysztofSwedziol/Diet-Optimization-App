import { Picker, Pill, Knob } from './SegmentedPicker.styles.ts';

type Option = { value: string; label: string };

type Props = {
  options: Option[]; // np. 2 pozycje
  value: string; // wybrany value
  onChange: (v: string) => void;
};

const SegmentedPicker = ({ options, value, onChange }: Props) => {
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

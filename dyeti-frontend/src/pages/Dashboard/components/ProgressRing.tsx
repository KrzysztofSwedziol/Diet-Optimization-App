import * as Ui from './ProgressRing.styles.ts';
import { formatNumber } from '../utils/formatNumber';
import dyetiPencil from '@/assets/dyeti-pencil.svg';
type Props = {
  value: number;
  target: number;
  size?: number;
  thickness?: number;
  unit?: string;
};
const ProgressRing = ({ value, target, unit, size, thickness }: Props) => (
  <Ui.Container>
    <Ui.RingContainer>
      <Ui.Ring $value={Math.min((value / target) * 100, 100)} $size={size} $thickness={thickness} />
      <Ui.LogoContainer>
        <Ui.Logo thickness={20} src={dyetiPencil} />
      </Ui.LogoContainer>
    </Ui.RingContainer>
    <Ui.Value>
      {' '}
      {formatNumber(value)} {unit ?? ''} / {target} {unit ?? ''}
    </Ui.Value>
  </Ui.Container>
);
export default ProgressRing;

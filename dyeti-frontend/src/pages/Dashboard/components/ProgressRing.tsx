import * as Ui from './ProgressRing.styles.ts';
import { formatNumber } from '../utils/formatNumber';
type Props = {
  value: number;
  target: number;
  unit?: string;
};
const ProgressRing = ({ value, target, unit }: Props) => (
  <Ui.Container>
    <Ui.Ring $value={Math.min((value / target) * 100, 100)} $size={150} />
    <Ui.Value>
      {' '}
      {formatNumber(value)} {unit ?? ''} / {target} {unit ?? ''}
    </Ui.Value>
  </Ui.Container>
);
export default ProgressRing;

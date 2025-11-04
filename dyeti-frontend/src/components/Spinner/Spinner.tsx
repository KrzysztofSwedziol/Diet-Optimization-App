import * as Ui from './Spinner.styles';

type Props = {
  size?: number;
};

const Spinner = ({ size }: Props) => <Ui.Container $size={size} />;

export default Spinner;

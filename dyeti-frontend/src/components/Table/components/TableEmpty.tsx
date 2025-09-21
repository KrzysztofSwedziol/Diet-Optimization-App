import * as Ui from './TableEmpty.styles';

interface Props {
  message?: string;
}

function TableEmpty({ message = 'No items found' }: Props) {
  return (
    <Ui.Container>
      <Ui.Message>{message}</Ui.Message>
    </Ui.Container>
  );
}

export default TableEmpty;

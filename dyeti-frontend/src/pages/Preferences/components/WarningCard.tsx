import * as Ui from './WarningCard.styles';

type Props = {
  title: string;
  description: string;
};

const WarningCard = ({ title, description }: Props) => {
  return (
    <Ui.Container>
      <Ui.Title>{title}</Ui.Title>
      <Ui.Description>{description}</Ui.Description>
    </Ui.Container>
  );
};

export default WarningCard;

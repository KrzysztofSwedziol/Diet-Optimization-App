import * as Ui from './AccountTabs.styles.ts';

type Props = {
  fulfilled: boolean;
  message: string;
};
const Requirement = ({ fulfilled, message }: Props) => {
  return (
    <Ui.RequirementContainer>
      {fulfilled ? <Ui.RequirementSuccessIcon /> : <Ui.RequirementIcon />}
      <Ui.RequirementLabel $fulfilled={fulfilled}>{message}</Ui.RequirementLabel>
    </Ui.RequirementContainer>
  );
};
export default Requirement;

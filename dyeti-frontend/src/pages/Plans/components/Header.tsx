import { useNavigate } from 'react-router-dom';
import * as Ui from './Header.styles';

const Header = () => {
  const navigate = useNavigate();

  const handleGeneratePlan = () => {
    navigate('/plans/generate');
  };

  return (
    <Ui.Container>
      <Ui.Title>Plans</Ui.Title>
      <Ui.Content>
        <Ui.Description>
          Keep track of all your diet plans. Create new ones, or remove plans you no longer need - quickly and easily.
        </Ui.Description>
        <Ui.Buttons>
          <Ui.Button onClick={handleGeneratePlan}>Create New Plan</Ui.Button>
        </Ui.Buttons>
      </Ui.Content>
    </Ui.Container>
  );
};

export default Header;

import * as Ui from './Header.styles';

const Header = () => {
  return (
    <Ui.Container>
      <Ui.Title>Preferences</Ui.Title>
      <Ui.Content>
        <Ui.Description>
          Set your preferences for various products to help us tailor your diet plans according to your tastes and
          nutritional needs.
        </Ui.Description>
      </Ui.Content>
    </Ui.Container>
  );
};

export default Header;

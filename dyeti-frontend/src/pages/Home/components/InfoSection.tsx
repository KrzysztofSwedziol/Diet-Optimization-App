import * as Ui from './InfoSection.styles';

const InfoSection = () => {
  return (
    <Ui.Container>
      <Ui.Content>
        <Ui.Title>How it works?</Ui.Title>
        <Ui.Cards>
          <Ui.Card>
            <Ui.CardTitle>Set your preferences</Ui.CardTitle>
            <Ui.CardDescription>
              Choose your favorite products from our extensive catalog. Assign a preference score to each product to
              control how often it appears in your diet plan.
            </Ui.CardDescription>
          </Ui.Card>
          <Ui.Card>
            <Ui.CardTitle>Define plan constraints</Ui.CardTitle>
            <Ui.CardDescription>
              Specify your calories and nutrient requirements to create a balanced and personalized diet plan. The plan
              adjusts to your needs.
            </Ui.CardDescription>
          </Ui.Card>
          <Ui.Card>
            <Ui.CardTitle>Enjoy your optimized plan</Ui.CardTitle>
            <Ui.CardDescription>
              Receive a customized diet plan that meets your preferences and nutritional needs. Use our AI for tasty
              meal suggestions.
            </Ui.CardDescription>
          </Ui.Card>
        </Ui.Cards>
      </Ui.Content>
    </Ui.Container>
  );
};

export default InfoSection;

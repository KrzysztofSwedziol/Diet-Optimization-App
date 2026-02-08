import * as Ui from './ExampleSection.styles';
import examplePlanImage from '../../../assets/example-plan.png';
import exampleMealImage from '../../../assets/example-meal.png';

const ExampleSection = () => {
  return (
    <Ui.Container>
      <Ui.Content>
        <Ui.Image src={examplePlanImage} />
        <Ui.Description>
          <Ui.Title>Optimize your diet plan</Ui.Title>
          <Ui.Text>
            Get a list of products that best fit your preferences and nutritional needs. Our advanced optimization
            algorithm ensures that your diet plan is both effective and enjoyable, helping you achieve your health goals
            with ease.
          </Ui.Text>
        </Ui.Description>
      </Ui.Content>
      <Ui.Content $reversed>
        <Ui.Image src={exampleMealImage} />
        <Ui.Description>
          <Ui.Title>Get inspired by AI generated meals</Ui.Title>
          <Ui.Text>
            Discover delicious and nutritious meal ideas crafted by our AI to help you stay on track with your diet
            plan. After generating your plan you may split it into meals and get recipe suggestions for each of them.
            Enjoy.
          </Ui.Text>
        </Ui.Description>
      </Ui.Content>
    </Ui.Container>
  );
};

export default ExampleSection;

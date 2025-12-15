import { MealProduct, Recipe } from '@/types';
import * as Ui from './MealCard.styles';
import { useState } from 'react';
import ProductsList from './ProductsList';

type Props = {
  recipe: Recipe;
  products: MealProduct[];
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onToggle?: () => void;
};

const MealCard = ({ recipe, products, isOpen: controlledIsOpen, defaultIsOpen = false, onToggle }: Props) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultIsOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const handleToggle = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(!uncontrolledIsOpen);
    }
    onToggle?.();
  };

  return (
    <Ui.Container>
      <Ui.Header onClick={handleToggle} $isOpen={isOpen}>
        <Ui.Title>{recipe.recipeName}</Ui.Title>
        <Ui.ExpandIcon $isOpen={isOpen} />
      </Ui.Header>
      <Ui.Body $isOpen={isOpen}>
        <Ui.Content>
          <Ui.RecipeGrid>
            <Ui.Description>{recipe.description}</Ui.Description>
            <Ui.Ingredients>
              <ProductsList products={products} />
            </Ui.Ingredients>
            <Ui.Steps>
              Preparation:
              <Ui.StepsList>
                {recipe.steps.map((step, index) => (
                  <Ui.StepItem key={index}>
                    <Ui.StepText>
                      <Ui.StepNumber>Step {index + 1}:</Ui.StepNumber> {step}
                    </Ui.StepText>
                  </Ui.StepItem>
                ))}
              </Ui.StepsList>
            </Ui.Steps>
          </Ui.RecipeGrid>
        </Ui.Content>
      </Ui.Body>
    </Ui.Container>
  );
};

export default MealCard;

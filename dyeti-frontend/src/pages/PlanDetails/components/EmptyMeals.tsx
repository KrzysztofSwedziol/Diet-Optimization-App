import { AppButton, Spinner } from '@/components';
import * as Ui from './EmptyMeals.styles';
import { useState } from 'react';

type Props = {
  isGenerating: boolean;
  onGenerateMeals: (numberOfMeals: number) => void;
};

const EmptyMeals = ({ isGenerating, onGenerateMeals }: Props) => {
  const [numberOfMeals, setNumberOfMeals] = useState(String(3));

  const updateValue = (value: number) => {
    const clamped = value < 1 ? 1 : value;
    setNumberOfMeals(String(clamped));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === '') return setNumberOfMeals('');

    if (/^\d+$/.test(raw)) updateValue(Number(raw));
  };

  const handleBlur = () => {
    if (numberOfMeals.trim() === '') updateValue(1);
  };

  const decrement = () => updateValue(Number(numberOfMeals) - 1);
  const increment = () => updateValue(Number(numberOfMeals) + 1);

  return (
    <Ui.Container>
      {isGenerating ? (
        <Ui.Loading>
          <Spinner size={32} />
          <Ui.LoadingText>Generating meals...</Ui.LoadingText>
        </Ui.Loading>
      ) : (
        <>
          <Ui.Header>
            <Ui.Title>Generate Meals with AI</Ui.Title>
            <Ui.Description>
              Use AI to turn your plan into complete meals. Choose how many meals you want, and we’ll generate recipes
              based on the products in your plan.
            </Ui.Description>
          </Ui.Header>

          <Ui.Actions>
            <Ui.NumericInput>
              <Ui.StepButton onClick={decrement} disabled={Number(numberOfMeals) <= 1}>
                <Ui.MinusIcon />
              </Ui.StepButton>
              <Ui.Input value={numberOfMeals} type="number" min={1} onChange={handleInput} onBlur={handleBlur} />
              <Ui.StepButton onClick={increment}>
                <Ui.PlusIcon />
              </Ui.StepButton>
            </Ui.NumericInput>
            <AppButton onClick={() => onGenerateMeals(Number(numberOfMeals))}>Generate Meals</AppButton>
          </Ui.Actions>
        </>
      )}
    </Ui.Container>
  );
};

export default EmptyMeals;

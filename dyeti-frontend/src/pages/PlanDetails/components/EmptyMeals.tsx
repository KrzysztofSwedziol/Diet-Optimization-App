import { AppButton, Spinner } from '@/components';
import * as Ui from './EmptyMeals.styles';

type Props = {
  isGenerating: boolean;
  onGenerateMeals: () => void;
};

const EmptyMeals = ({ isGenerating, onGenerateMeals }: Props) => {
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
            <AppButton onClick={onGenerateMeals}>Generate Meals</AppButton>
          </Ui.Actions>
        </>
      )}
    </Ui.Container>
  );
};

export default EmptyMeals;

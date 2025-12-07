import { useGetProductsWithPreferences } from '@/api/product/hooks';
import * as Ui from './Steps.styles';
import StepControls from './StepControls';

type Props = {
  goNext: () => void;
};

const StepCheck = ({ goNext }: Props) => {
  const { data: products } = useGetProductsWithPreferences();
  const hasEnoughPreferences = products && products.filter(({ preference }) => preference > 0).length >= 5;

  return (
    <Ui.Container>
      <Ui.Section>
        <Ui.Subtitle>Step 1: Review Your Preferences</Ui.Subtitle>
        <Ui.Text>
          Your diet plan is built around what you enjoy. Before moving on, take a moment to review your preferences and
          make sure everything looks right.
        </Ui.Text>
        <Ui.StyledLink to="/preferences">Review Your Preferences</Ui.StyledLink>
      </Ui.Section>

      {!hasEnoughPreferences && (
        <Ui.WarningBox>
          <Ui.WarningText>
            To continue, please choose at least 5 preferred products. This helps us build a plan that actually fits your
            tastes.
          </Ui.WarningText>
        </Ui.WarningBox>
      )}

      <StepControls onNext={goNext} nextDisabled={!hasEnoughPreferences} />
    </Ui.Container>
  );
};

export default StepCheck;

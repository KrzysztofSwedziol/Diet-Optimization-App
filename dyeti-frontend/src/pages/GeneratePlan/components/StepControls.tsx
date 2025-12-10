import { AppButton } from '@/components';
import * as Ui from './StepControls.styles';

type Props = {
  onNext?: () => void;
  onBack?: () => void;
  withSubmit?: boolean;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  submitDisabled?: boolean;
  isSubmitting?: boolean;
};

const StepControls = ({
  onNext,
  onBack,
  withSubmit = false,
  nextDisabled = false,
  backDisabled = false,
  submitDisabled = false,
  isSubmitting = false,
}: Props) => {
  return (
    <Ui.Container>
      {onBack && (
        <AppButton type="button" onClick={onBack} reversed fullWidth disabled={backDisabled}>
          Back
        </AppButton>
      )}
      {onNext && (
        <AppButton type="button" onClick={onNext} fullWidth disabled={nextDisabled}>
          Next
        </AppButton>
      )}
      {withSubmit && (
        <AppButton type="submit" fullWidth disabled={submitDisabled || isSubmitting}>
          {isSubmitting ? 'Generating…' : 'Generate'}
        </AppButton>
      )}
    </Ui.Container>
  );
};

export default StepControls;

import { Controller, type UseFormReturn } from 'react-hook-form';
import Input from '../../../components/Inputs/Input/Input';
import TextArea from '../../../components/Inputs/TextArea/TextArea';
import { FormValues } from '../types';
import { useCheckPlanNameAvailability } from '@/api/plan/hooks';
import * as Ui from './Steps.styles';
import StepControls from './StepControls';

type Props = {
  goNext: () => void;
  goBack: () => void;
  formMethods: UseFormReturn<FormValues>;
};

const StepInfo = ({ goNext, goBack, formMethods }: Props) => {
  const { control, trigger, formState } = formMethods;
  const { errors } = formState;
  const { checkPlanNameAvailability } = useCheckPlanNameAvailability();

  const handleNext = async () => {
    const isValid = await trigger(['name', 'description']);

    if (isValid) {
      goNext();
    }
  };

  const nextDisabled = !!errors.name || !!errors.description;

  return (
    <Ui.Container>
      <Ui.Section>
        <Ui.Subtitle>Step 2: Choose a Name</Ui.Subtitle>
        <Ui.Text>Give your diet plan a name and add a short description to help you remember its purpose.</Ui.Text>

        <Ui.InputsContainer>
          <Controller
            name="name"
            control={control}
            rules={{
              validate: async (value: string) => {
                const trimmedValue = value.trim();
                if (trimmedValue.length === 0) {
                  return 'Name cannot be empty';
                }
                try {
                  const isAvailable = await checkPlanNameAvailability(trimmedValue);
                  return isAvailable || 'You already have a plan with this name';
                } catch {
                  return 'Error checking name availability';
                }
              },
            }}
            render={({ field }) => (
              <Input label="NAME" placeholder="Balanced Weekly Plan" error={errors.name?.message} required {...field} />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              maxLength: {
                value: 1000,
                message: 'Description must be under 1000 characters',
              },
            }}
            render={({ field }) => (
              <TextArea
                label="DESCRIPTION"
                placeholder="A weekly plan focused on maintaining energy while losing fat."
                error={errors.description?.message}
                rows={3}
                {...field}
              />
            )}
          />
        </Ui.InputsContainer>
      </Ui.Section>

      <StepControls onNext={handleNext} onBack={goBack} nextDisabled={nextDisabled} />
    </Ui.Container>
  );
};

export default StepInfo;

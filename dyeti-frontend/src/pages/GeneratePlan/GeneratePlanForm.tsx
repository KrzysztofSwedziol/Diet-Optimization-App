import { useState } from 'react';
import Input from '../../components/Inputs/Input/Input';
import TextArea from '../../components/Inputs/TextArea/TextArea';
import { AppButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import * as Ui from '../Auth/Auth.styles.ts';
import { useCheckAvailability } from '../../api/plans/hooks';
import { usePlanGeneration } from '../../components/providers/PlanGenerationProvider/PlanGenerationProvider.tsx';
//TODO: Error can be added as part of App button also FormGrid can be separate component
//TODO: Use isPending here and spinner from Eryk branch
//TODO: Remove margins from AppButton
const GeneratePlanForm = () => {
  const { name, setName, description, setDescription } = usePlanGeneration();
  const [errors, setErrors] = useState<{ name?: string; global?: string }>({});
  const navigate = useNavigate();
  const { mutateAsync: checkAvailability } = useCheckAvailability();
  const validateName = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setErrors({ name: 'Name cannot be empty' });
      return false;
    }
    try {
      const isAvailable = await checkAvailability(trimmed);
      if (!isAvailable) {
        setErrors({ name: 'You already have plan with that name' });
        return false;
      }
      return true;
    } catch {
      setErrors({ global: 'Could not verify name. Please try again.' });
      return false;
    }
  };
  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ name: '', global: '' });
    if (!(await validateName())) return;
    navigate('/plans/constraints');
  };

  return (
    <Ui.FormGrid onSubmit={handleNext}>
      <Input
        label="NAME"
        type="text"
        placeholder="Cutting Plan"
        value={name}
        onChange={e => setName(e.target.value)}
        error={errors.name}
      />

      <TextArea
        label="DESCRIPTION"
        placeholder="Describe your plan..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div>
        <AppButton fullWidth type="submit">
          Next
        </AppButton>
        {errors.global && <Ui.Error>{errors.global}</Ui.Error>}
      </div>
    </Ui.FormGrid>
  );
};

export default GeneratePlanForm;

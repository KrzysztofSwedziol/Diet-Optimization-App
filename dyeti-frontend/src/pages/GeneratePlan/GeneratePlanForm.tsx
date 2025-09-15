import { useState } from 'react';
import Input from '../../components/Inputs/Input/Input';
import TextArea from '../../components/Inputs/TextArea/TextArea';
import { AppButton } from '../../components';
import { useNavigate } from 'react-router-dom';

const GeneratePlanForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: walidacja
    navigate('/plans/constraints');
  };

  return (
    <form onSubmit={handleNext}>
      <Input label="NAME" type="text" placeholder="Cutting Plan" value={name} onChange={e => setName(e.target.value)} />

      <TextArea
        label="DESCRIPTION"
        placeholder="Describe your plan..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <AppButton fullWidth type="submit">
        Next
      </AppButton>
    </form>
  );
};

export default GeneratePlanForm;

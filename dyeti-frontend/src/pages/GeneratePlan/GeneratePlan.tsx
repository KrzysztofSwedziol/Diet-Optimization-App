import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import StepCheck from './components/StepCheck';
import StepInfo from './components/StepInfo';
import StepConstraints from './components/StepConstraints';
import { FormValues } from './types';
import Layout from '@/components/Layout/Layout';
import * as Ui from './GeneratePlan.styles';
import { useGeneratePlan } from '@/api/plan/hooks';
import { useNavigate } from 'react-router-dom';
import { Stepper } from '@/components';

const GeneratePlan = () => {
  const navigate = useNavigate();
  const { mutateAsync: generatePlan } = useGeneratePlan();
  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      calories: 2500,
      protein: 0,
      carbs: 0,
      fats: 0,
    },
    mode: 'onBlur',
  });

  const [step, setStep] = useState(0);

  const goNext = () => setStep(prev => prev + 1);
  const goBack = () => setStep(prev => Math.max(prev - 1, 0));

  const handleSubmit: SubmitHandler<FormValues> = async data => {
    try {
      const { name, description, calories, carbs, protein, fats } = data;
      await generatePlan({
        name,
        description,
        caloriesTarget: calories,
        carbsTarget: carbs,
        proteinsTarget: protein,
        fatsTarget: fats,
      });
      navigate('/plans');
    } catch {
      formMethods.setError('root.serverError', {
        type: 'server',
        message: 'Failed to generate plan.',
      });
    }
  };

  return (
    <Layout>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <Ui.Section>
          <Ui.SectionTitle>Build a Perfect Diet Plan</Ui.SectionTitle>
          <Ui.SectionDescription>
            Create a personalized diet plan based on your tastes and nutrition goals &mdash; all in a few quick steps.
          </Ui.SectionDescription>
        </Ui.Section>

        <Ui.Section>
          <Stepper currentStep={step} totalSteps={3} />
        </Ui.Section>

        {step === 0 && <StepCheck goNext={goNext} />}
        {step === 1 && <StepInfo goNext={goNext} goBack={goBack} formMethods={formMethods} />}
        {step === 2 && <StepConstraints formMethods={formMethods} goBack={goBack} />}
      </form>
    </Layout>
  );
};

export default GeneratePlan;

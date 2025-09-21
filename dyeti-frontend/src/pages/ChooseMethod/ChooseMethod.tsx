import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SegmentedPicker from '../../components/SegmentedPicker/SegmentedPicker';
import { AppButton } from '../../components';

import * as Ui from './ChooseMethod.styles';
import { METHOD_OPTIONS } from './types';
import FullLayout from '../../components/Layout/FullLayout';
import dyeti from '../../assets/dyeti-pencil.svg';
import { GenerationMode } from '../../api/types';
import { usePlanGeneration } from '../../components/providers/PlanGenerationProvider/PlanGenerationProvider';

const ChooseMethod = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<GenerationMode>('PRODUCT');
  const { isGenerating, generatePlan } = usePlanGeneration();
  const [error, setError] = useState('');

  const isMealBased = mode === 'MEAL';

  const onGenerate = async () => {
    setError('');
    const result = await generatePlan(mode);
    if (result.ok) {
      console.log(result.message);
      navigate('/');
      return;
    }
    setError(result.fieldErrors?.method ?? result.fieldErrors?.name ?? result.message);
  };

  const copy =
    mode === 'PRODUCT'
      ? {
        title: 'Product-Based',
        text:
          "We'll select the best combination of individual products to meet your targets. Great for flexibility and grocery-focused planning.",
      }
      : {
        title: 'Meal-Based',
        text:
          "We'll build a full meal plan around your targets. Great if you prefer ready-to-cook meals with balanced macros.",
      };

  return (
    <FullLayout
      title="Choose Method"
      description="Select how you'd like the plan to be generated — you can keep it flexible or go for a fully structured meal approach."
      logo={{ src: dyeti, alt: 'Dyeti-pencil' }}
    >
      <Ui.Wrapper>
        <SegmentedPicker options={METHOD_OPTIONS} value={mode} onChange={val => setMode(val as GenerationMode)} />

        <Ui.Card $error={isMealBased}>
          <Ui.CardTitle>{copy.title}</Ui.CardTitle>
          <Ui.CardText>{copy.text}</Ui.CardText>

          {isMealBased && (
            <Ui.Warning>Meal-based generation is part of our future scope and isn’t available yet.</Ui.Warning>
          )}
        </Ui.Card>

        <Ui.ButtonsGrid>
          <AppButton reversed fullWidth type="button" onClick={() => navigate(-1)}>
            Back
          </AppButton>
          <div>
            <AppButton
              fullWidth
              type="button"
              onClick={onGenerate}
              disabled={isGenerating}
              aria-disabled={isGenerating}
              title={isMealBased ? 'Coming soon' : undefined}
            >
              {isGenerating ? 'Generating…' : 'Generate'}
            </AppButton>
            {error && <Ui.Error>{error}</Ui.Error>}
          </div>
        </Ui.ButtonsGrid>
      </Ui.Wrapper>
    </FullLayout>
  );
};

export default ChooseMethod;

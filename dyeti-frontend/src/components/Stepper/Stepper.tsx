import React from 'react';
import * as Ui from './Stepper.styles';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <Ui.StepperContainer>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Ui.StepSegment key={index} filled={index <= currentStep} style={{ transitionDelay: `${index * 0.05}s` }} />
      ))}
    </Ui.StepperContainer>
  );
};

export default Stepper;

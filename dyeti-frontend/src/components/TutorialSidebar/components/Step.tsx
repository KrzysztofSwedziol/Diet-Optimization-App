import * as Ui from './Step.styles.ts';
import { TutorialStep } from '@/types';
import { useEffect, useState } from 'react';
import { AppButton } from '@/components';
import { useNavigate } from 'react-router-dom';

type Props = {
  step: TutorialStep;
  isTutorialOpen: boolean;
  tutorialId: number;
};
const imgDir = 'tutorials/';
const Step = ({ step, isTutorialOpen, tutorialId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const key = `step_done_${tutorialId}_${step.id}`;
  const raw = localStorage.getItem(key);
  const value = raw ? (JSON.parse(raw) as boolean) : false;
  const [isDone, setIsDone] = useState(step.done || value);

  useEffect(() => {
    if (!isTutorialOpen) setIsOpen(false);
  }, [isTutorialOpen]);

  const handleToggle = () => {
    if (!isTutorialOpen) return;
    if (isOpen) {
      setIsDone(true);
      localStorage.setItem(key, JSON.stringify(isDone));
    }
    setIsOpen(v => !v);
  };
  const handleGoTo = () => {
    if (!step.gotoLink) return;
    navigate(step.gotoLink);
  };
  return (
    <Ui.Container>
      <Ui.Header onClick={handleToggle} $isOpen={isOpen}>
        <Ui.DoneIcon $isDone={isDone} />
        <Ui.Title>{step.title}</Ui.Title>
        <Ui.ExpandIcon $isOpen={isOpen} />
      </Ui.Header>
      <Ui.Body $isOpen={isOpen}>
        <Ui.Content>
          <Ui.Description>{step.description}</Ui.Description>
          {step.img && (
            <Ui.ImageContainer>
              <Ui.Image src={imgDir + step.img} alt={step.title} loading="lazy" />
            </Ui.ImageContainer>
          )}
          {step.gotoLink && (
            <Ui.ButtonBox>
              <AppButton onClick={handleGoTo}>Go To</AppButton>
            </Ui.ButtonBox>
          )}
          <Ui.ButtonBox>
            <AppButton reversed onClick={handleToggle}>
              Done
            </AppButton>
          </Ui.ButtonBox>
        </Ui.Content>
      </Ui.Body>
    </Ui.Container>
  );
};
export default Step;

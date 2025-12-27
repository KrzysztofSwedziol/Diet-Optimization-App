import * as Ui from './Tutorial.styles.ts';
import { TutorialType } from '@/types';
import { useEffect, useState } from 'react';
import Step from './Step.tsx';

type Props = {
  tutorial: TutorialType;
  isSidebarOpen: boolean;
  index: number;
};
const Tutorial = ({ tutorial, isSidebarOpen, index }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isSidebarOpen) setIsOpen(false);
  }, [isSidebarOpen]);

  const handleToggle = () => {
    if (!isSidebarOpen) return;
    setIsOpen(v => !v);
  };
  return (
    <Ui.Container $isOpen={isSidebarOpen} index={index}>
      <Ui.Header onClick={handleToggle} $isOpen={isOpen}>
        <Ui.Title>{tutorial.title}</Ui.Title>
        <Ui.ExpandIcon $isOpen={isOpen} />
      </Ui.Header>
      <Ui.Body $isOpen={isOpen}>
        <Ui.Content>
          <Ui.Description>{tutorial.description}</Ui.Description>
          {tutorial.steps.map((s, i) => (
            <Step step={s} tutorialId={tutorial.id} isTutorialOpen={isOpen} key={i} />
          ))}
        </Ui.Content>
      </Ui.Body>
    </Ui.Container>
  );
};
export default Tutorial;

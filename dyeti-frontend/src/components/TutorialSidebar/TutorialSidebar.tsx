import { useAuth } from '@/context';
import * as Ui from './TutorialSidebar.styles.ts';
import { FaQuestion } from 'react-icons/fa';
import { useState } from 'react';
import { TUTORIALS } from './tutorials/tutorials.content.ts';
import Tutorial from './components/Tutorial.tsx';

const TutorialSidebar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  if (!isLoggedIn) return null;
  return (
    <Ui.Container $isOpen={isOpen}>
      <Ui.Blob onClick={() => setIsOpen(!isOpen)}>
        <FaQuestion />
      </Ui.Blob>
      <Ui.Content>
        <Ui.TitleContainer $isOpen={isOpen}>
          <Ui.Icon />
          <Ui.Title>Tutorials: </Ui.Title>
        </Ui.TitleContainer>
        <Ui.TutorialList>
          {TUTORIALS.map((t, index) => (
            <Tutorial key={index} tutorial={t} isSidebarOpen={isOpen} index={index} />
          ))}
        </Ui.TutorialList>
      </Ui.Content>
    </Ui.Container>
  );
};
export default TutorialSidebar;

import GeneratePlanForm from './GeneratePlanForm';
import dyeti from '../../assets/dyeti-pencil.svg';
import FullLayout from '../../components/Layout/FullLayout.tsx';

const GeneratePlan = () => {
  return (
    <FullLayout
      title="Generate New Plan"
      description="Let’s get started! Name your plan and tell us what it’s for — we’ll guide you through
      setting your goals and generating a personalized plan."
      logo={{ src: dyeti, alt: 'Dyeti-pencil' }}
    >
      <GeneratePlanForm />
    </FullLayout>
  );
};

export default GeneratePlan;

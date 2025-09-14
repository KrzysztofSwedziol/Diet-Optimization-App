import GeneratePlanLayout from './GeneratePlanLayout';
import GeneratePlanForm from './GeneratePlanForm';

const GeneratePlan = () => {
  return (
    <GeneratePlanLayout
      title="Generate New Plan"
      description="Let’s get started! Name your plan and tell us what it’s for — we’ll guide you through
      setting your goals and generating a personalized plan."
    >
      <GeneratePlanForm />
    </GeneratePlanLayout>
  );
};

export default GeneratePlan;

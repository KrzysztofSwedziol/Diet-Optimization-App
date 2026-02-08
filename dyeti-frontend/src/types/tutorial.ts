export type TutorialType = {
  id: number;
  title: string;
  description: string;
  steps: readonly TutorialStep[];
};

export type TutorialStep = {
  id: number;
  title: string;
  description: string;
  step: number;
  done: boolean;
  img?: string;
  gotoLink?: string;
};

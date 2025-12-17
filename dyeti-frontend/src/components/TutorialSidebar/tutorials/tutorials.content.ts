export const TUTORIALS = [
  {
    id: 1,
    title: 'Getting started',
    description:
      'A quick walkthrough of the things you need to do before generating your first Yeti-approved diet plan.',

    steps: [
      {
        id: 1,
        title: 'Open Products',
        description: 'First go to the Products page via the navbar, or click the GO TO button below.',
        step: 1,
        done: false,
        gotoLink: '/products',
        img: 'getting_started_1.png',
      },
      {
        id: 2,
        title: 'Star products',
        description:
          'Star products you’d like to use in future plans. They’ll be added to your preferences with a default score of 0, which you can change later.',
        step: 2,
        done: false,
        img: 'getting_started_2.png',
      },
      {
        id: 3,
        title: 'Unstar products',
        description: 'You can unstar products at any time. This will remove all preference points, so be careful.',
        step: 3,
        done: false,
        img: 'getting_started_3.png',
      },
      {
        id: 4,
        title: 'Open Preferences',
        description: 'Go to Preferences page via the navbar, or click the GO TO button below.',
        step: 3,
        done: false,
        gotoLink: 'preferences',
        img: 'getting_started_4.png',
      },
    ],
  },
] as const;

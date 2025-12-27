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
        step: 4,
        done: false,
        gotoLink: 'preferences',
        img: 'getting_started_4.png',
      },
      {
        id: 5,
        title: 'Recently used',
        description:
          "You’ll see all your starred products under the 'Recently used' section. If you don’t see any, you haven’t starred any products yet.",
        step: 5,
        done: false,
        img: 'getting_started_5.png',
      },
      {
        id: 6,
        title: 'Set up preferences',
        description:
          'Click a product card to open the modal shown below. Rate your preference from 0 to 10 — higher scores make the algorithm include this product more often. Try including a variety of products to make your plan more interesting. When you’re done, click Save to store your choice. Click Remove to clear your rating and unstar the product (it will also disappear from Recently used).',
        step: 6,
        done: false,
        img: 'getting_started_6.png',
      },
      {
        id: 7,
        title: 'Product with preferences',
        description:
          'In the Products preferences section, you’ll see all products that would be used when generating your Yeti-approved plan. If you don’t want a product to be included, set its preference to 0 — it will move to Recently used so you can enable it again later. To remove a product completely, click Remove.',
        step: 7,
        done: false,
        img: 'getting_started_7.png',
      },
      {
        id: 8,
        title: 'Final step',
        description:
          "If you forgot to add a product, use the search bar to find it and set your preferences. Once you’ve completed the previous steps, you can move on to generating your first Yeti-approved plan. You can also check the 'Generating Plan' tutorial.",
        step: 8,
        done: false,
        img: 'getting_started_8.png',
      },
    ],
  },
  {
    id: 2,
    title: 'Generating Plan',
    description: 'Finish this tutorial to get familiar with process of generating Yeti-approved diet plan',
    steps: [
      {
        id: 1,
        step: 1,
        title: 'Open Plans',
        description: 'Go to the Plans page and click "Create New Pan" button, or just use Go To button bellow',
        gotoLink: 'plans/generate',
        done: false,
        img: '2_1.png',
      },
      {
        id: 2,
        step: 2,
        title: 'Name & Description',
        description: 'Choose a name and description that match your plan. The plan name is required.',
        done: false,
        img: '2_2.png',
      },
      {
        id: 3,
        step: 3,
        title: 'Set Constraints',
        description:
          'Set your calorie and macro targets for the plan. The algorithm will try to match these values as closely as possible. You can enter targets by calories or by macros. If you set calories only, the macro targets will be adjusted proportionally.',
        done: false,
        img: '2_3.png',
      },
      {
        id: 4,
        step: 4,
        title: 'Generate',
        description:
          "Click the 'Generate' button and wait for your new plan — it may take a moment. Result will be available on Plans page. If it’s not there yet, wait a bit and refresh the page.",
        done: false,
        gotoLink: 'plans',
      },
      {
        id: 5,
        step: 5,
        title: 'AI Meals',
        description:
          "Click on your Generated plan to go to plan details. Scroll down and click 'Generate Meals' to create AI-generated meals and recipes. This can take a while, so please be patient and don’t refresh the page while generation is in progress. If everything finishes successfully - congratulations, you can enjoy your first Yeti-approved diet plan.",
        done: false,
        img: '2_5.png',
      },
    ],
  },
] as const;

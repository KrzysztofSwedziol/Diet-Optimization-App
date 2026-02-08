const mealKeys = {
  all: ['meals'] as const,
  details: (planId: number) => [...mealKeys.all, 'detail', planId] as const,
};

export default mealKeys;

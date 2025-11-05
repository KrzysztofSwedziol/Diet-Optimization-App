const planKeys = {
  all: ['plans'] as const,

  lists: () => [...planKeys.all, 'list'] as const,
  list: (listId: number) => [...planKeys.lists(), listId] as const,

  details: () => [...planKeys.all, 'detail'] as const,
  detail: (planId: number) => [...planKeys.details(), planId] as const,
};

export default planKeys;

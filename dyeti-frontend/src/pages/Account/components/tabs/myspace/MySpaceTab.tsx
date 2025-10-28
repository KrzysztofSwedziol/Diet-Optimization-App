import * as Ui from '../AccountTabs.styles.ts';
import AccountCard from '@/pages/Account/components/tabs/myspace/AccountCard.tsx';
import {
  FiCalendar, // My Plans
  FiPackage, // My Products
  FiBox, // Added Products
  FiBookOpen, // Added Recipes
  FiTarget, // My Goals
  FiSliders, // My Preferences
  FiPlusCircle, // Add Recipe
  FiPlusSquare, // Add Product
} from 'react-icons/fi';
import { CardCfg } from '@/pages/Account/types.ts';

const CARDS: readonly CardCfg[] = [
  {
    key: 'myPlans',
    to: '/plans',
    icon: FiCalendar,
    title: 'My Plans',
    description: 'Browse and manage the plans you created.',
  },
  {
    key: 'myProducts',
    to: '/products',
    icon: FiPackage,
    title: 'My Products',
    description: 'Manage all products — add new ones or remove old ones.',
  },
  {
    key: 'addedProducts',
    to: '/products/added',
    icon: FiBox,
    title: 'Added Products',
    description: 'Products you added. Review and delete items.',
  },
  {
    key: 'addedRecipes',
    to: '/recipes/added',
    icon: FiBookOpen,
    title: 'Added Recipes',
    description: 'Recipes you created. Manage and delete.',
  },
  {
    key: 'myGoals',
    to: '/goals',
    icon: FiTarget,
    title: 'My Goals',
    description: 'Your weight and calorie targets.',
  },
  {
    key: 'myPreferences',
    to: '/preferences',
    icon: FiSliders,
    title: 'My Preferences',
    description: 'Manage preferences applied to products.',
  },
  {
    key: 'addRecipe',
    to: '/recipes/new',
    icon: FiPlusCircle,
    title: 'Add Recipe',
    description: 'Create a new recipe.',
  },
  {
    key: 'addProduct',
    to: '/products/new',
    icon: FiPlusSquare,
    title: 'Add Product',
    description: 'Add a new product.',
  },
] as const;

const MySpaceTab = () => {
  return (
    <Ui.MySpaceGrid>
      {CARDS.map(({ key, to, icon, title, description }) => (
        <AccountCard key={key} to={to} icon={icon} title={title} description={description} />
      ))}
    </Ui.MySpaceGrid>
  );
};

export default MySpaceTab;

import { PlanProduct } from '@/types';
import ProductEntry from './ProductEntry';
import * as Ui from './MealCard.styles';
import { useState } from 'react';

type Props = {
  title: string;
  products: PlanProduct[];
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onToggle?: () => void;
};

const MealCard = ({ title, products, isOpen: controlledIsOpen, defaultIsOpen = false, onToggle }: Props) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultIsOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const handleToggle = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(!uncontrolledIsOpen);
    }
    onToggle?.();
  };

  return (
    <Ui.Container>
      <Ui.Header onClick={handleToggle} $isOpen={isOpen}>
        <Ui.Title>{title}</Ui.Title>
        <Ui.ExpandIcon $isOpen={isOpen} />
      </Ui.Header>
      <Ui.Body $isOpen={isOpen}>
        <Ui.Content>
          <Ui.Products $isOpen={isOpen}>
            {products.map(({ product, quantity }) => (
              <Ui.ProductContainer key={product.id}>
                <ProductEntry product={product} quantity={quantity} />
              </Ui.ProductContainer>
            ))}
          </Ui.Products>
        </Ui.Content>
      </Ui.Body>
    </Ui.Container>
  );
};

export default MealCard;

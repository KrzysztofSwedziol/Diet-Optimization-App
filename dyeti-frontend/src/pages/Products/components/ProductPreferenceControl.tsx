import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductWithPreference } from '@/types';
import { useUpdateProductPreference } from '@/api/product/hooks';
import { clamp } from '@/utils/clamp';
import * as Ui from './ProductPreferenceControl.styles';

type Props = {
  productWithPreference: ProductWithPreference;
};

const ProductPreferenceControl = ({ productWithPreference }: Props) => {
  const { product, preference: initialPreference } = productWithPreference;
  const { mutate: updateProductPreference } = useUpdateProductPreference();

  const [preference, setPreference] = useState(initialPreference);
  const debouncedPreference = useDebounce(preference, 300);

  useEffect(() => {
    updateProductPreference({ productId: product.id, preference: debouncedPreference });
  }, [debouncedPreference, product.id, updateProductPreference]);

  const handleChange = (value: number) => {
    setPreference(clamp(value, 0, 10));
  };

  return (
    <Ui.Container>
      <Ui.Button onClick={() => handleChange(preference - 1)} disabled={preference <= 0}>
        <Ui.MinusIcon />
      </Ui.Button>

      <Ui.Value>{Math.round(preference)}</Ui.Value>

      <Ui.Button onClick={() => handleChange(preference + 1)} disabled={preference >= 10}>
        <Ui.PlusIcon />
      </Ui.Button>
    </Ui.Container>
  );
};

export default ProductPreferenceControl;

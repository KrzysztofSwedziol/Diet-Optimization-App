import { useState } from 'react';
import { ProductWithPreference } from '@/types';
import { useUpdateProductPreference } from '@/api/product/hooks';
import { clamp } from '@/utils/clamp';
import * as Ui from './ProductPreferenceControl.styles';
import { useDebouncedCallback } from '@tanstack/react-pacer';

type Props = {
  productWithPreference: ProductWithPreference;
};

const ProductPreferenceControl = ({ productWithPreference }: Props) => {
  const { product, preference: initialPreference } = productWithPreference;
  const { mutate: updateProductPreference } = useUpdateProductPreference();

  const [preference, setPreference] = useState(initialPreference);

  const debouncedUpdatePreference = useDebouncedCallback(
    (preference: number) => {
      updateProductPreference({ productId: product.id, preference });
    },
    { wait: 500 },
  );

  const handleChange = (value: number) => {
    const clampedValue = clamp(value, 0, 10);
    setPreference(clampedValue);
    debouncedUpdatePreference(clampedValue);
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

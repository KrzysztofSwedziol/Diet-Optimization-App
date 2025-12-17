import { useEffect, useRef, useState } from 'react';
import { clamp } from '@/utils/clamp';
import { ProductWithPreference } from '@/types';

import NutritionInfo from './NutritionInfo';
import * as Ui from './ProductModal.styles';
import { AppButton } from '@/components';

type Props = {
  product: ProductWithPreference;
  onClose: () => void;
  onSavePreference: (id: number, preference: number) => void;
  onRemovePreference: (id: number) => void;
};

const ProductModal = ({ product: productWithPreference, onClose, onSavePreference, onRemovePreference }: Props) => {
  const { product, preference } = productWithPreference;

  const [inputValue, setInputValue] = useState(String(preference));

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus(), []);

  const updateValue = (value: number) => {
    const clamped = clamp(value, 0, 10);
    setInputValue(String(clamped));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === '') return setInputValue('');

    if (/^\d+$/.test(raw)) updateValue(Number(raw));
  };

  const handleBlur = () => {
    if (inputValue.trim() === '') updateValue(0);
  };

  const decrement = () => updateValue(Number(inputValue) - 1);
  const increment = () => updateValue(Number(inputValue) + 1);

  const handleSave = () => {
    onSavePreference(product.id, Number(inputValue));
    onClose();
  };
  const handleRemove = () => {
    onRemovePreference(product.id);
    onClose();
  };

  return (
    <Ui.StyledModal open={!!product} onClose={onClose}>
      <Ui.Header>
        <Ui.Title>Edit Preference</Ui.Title>
        <Ui.CloseButton onClick={onClose}>✕</Ui.CloseButton>
      </Ui.Header>

      <Ui.Content>
        <Ui.ProductName>{product.name}</Ui.ProductName>

        <Ui.Section>
          <Ui.SectionLabel>Nutrition</Ui.SectionLabel>
          <Ui.SectionDescription>Overview of nutritional values per 100g.</Ui.SectionDescription>

          <NutritionInfo
            kcal={product.kcal100g}
            protein={product.protein100g}
            carbs={product.carbs100g}
            fat={product.fat100g}
          />
        </Ui.Section>

        <Ui.Section>
          <Ui.SectionLabel>Your Preference (0–10)</Ui.SectionLabel>
          <Ui.SectionDescription>Determines how often the product appears in your diet.</Ui.SectionDescription>

          <Ui.PreferenceControl>
            <Ui.StepButton onClick={decrement} disabled={Number(inputValue) <= 0}>
              <Ui.MinusIcon />
            </Ui.StepButton>

            <Ui.Input
              ref={inputRef}
              value={inputValue}
              type="number"
              min={0}
              max={10}
              onChange={handleInput}
              onBlur={handleBlur}
            />

            <Ui.StepButton onClick={increment} disabled={Number(inputValue) >= 10}>
              <Ui.PlusIcon />
            </Ui.StepButton>
          </Ui.PreferenceControl>

          <Ui.ButtonsContainer>
            <AppButton onClick={handleSave}>Save</AppButton>
            <AppButton reversed onClick={handleRemove}>
              {' '}
              Remove
            </AppButton>
          </Ui.ButtonsContainer>
        </Ui.Section>
      </Ui.Content>
    </Ui.StyledModal>
  );
};

export default ProductModal;

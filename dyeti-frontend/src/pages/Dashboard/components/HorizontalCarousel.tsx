import { useState } from 'react';
import * as Ui from './HorizontalCarousel.styles.ts';

type Props<T> = {
  items: T[];
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  getKey?: (item: T, index: number) => React.Key;
};

const HorizontalCarousel = <T,>({ items, renderItem, getKey }: Props<T>) => {
  const n = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  if (n === 0) return null;

  const prev = () => setActiveIndex(i => (i - 1 + n) % n);
  const next = () => setActiveIndex(i => (i + 1) % n);

  const prevIndex = (activeIndex - 1 + n) % n;
  const nextIndex = (activeIndex + 1) % n;

  const keyOf = (item: T, index: number) => (getKey ? getKey(item, index) : index);

  return (
    <Ui.Wrapper>
      <Ui.Arrow type="button" onClick={prev} aria-label="Previous">
        ‹
      </Ui.Arrow>

      <Ui.Track>
        <Ui.Slide $variant="side" key={keyOf(items[prevIndex], prevIndex)}>
          {renderItem(items[prevIndex], false)}
        </Ui.Slide>

        <Ui.Slide $variant="active" key={keyOf(items[activeIndex], activeIndex)}>
          {renderItem(items[activeIndex], true)}
        </Ui.Slide>

        <Ui.Slide $variant="side" key={keyOf(items[nextIndex], nextIndex)}>
          {renderItem(items[nextIndex], false)}
        </Ui.Slide>
      </Ui.Track>

      <Ui.Arrow type="button" onClick={next} aria-label="Next">
        ›
      </Ui.Arrow>
    </Ui.Wrapper>
  );
};

export default HorizontalCarousel;

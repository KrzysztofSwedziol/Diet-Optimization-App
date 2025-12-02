import { ReactNode, useState, useRef } from 'react';
import * as Ui from './SearchableDropdown.styles';
import { SearchBar } from '@/components';

type RenderItemProps<T> = {
  item: T;
  index: number;
};

type Props<T> = {
  items: T[];
  query: string;
  onSearch: (query: string) => void;
  renderItem: (props: RenderItemProps<T>) => ReactNode;
  placeholder?: string;
  noResults?: string;
};

export function SearchableDropdown<T>({
  items,
  query,
  onSearch,
  renderItem,
  placeholder = 'Search...',
  noResults = 'No results found',
}: Props<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const showDropdown = isFocused && query.length > 0;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  return (
    <Ui.Container ref={containerRef} tabIndex={-1} onFocus={handleFocus} onBlur={handleBlur}>
      <SearchBar onSearch={onSearch} placeholder={placeholder} />

      {showDropdown && (
        <Ui.DropdownContainer>
          <Ui.Dropdown>
            {items.length > 0 ? (
              items.map((item, index) => (
                <Ui.DropdownItem key={index} tabIndex={0}>
                  {renderItem({ item, index })}
                </Ui.DropdownItem>
              ))
            ) : (
              <Ui.NoResults>{noResults}</Ui.NoResults>
            )}
          </Ui.Dropdown>
        </Ui.DropdownContainer>
      )}
    </Ui.Container>
  );
}

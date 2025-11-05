import { ChangeEvent, useRef, useState } from 'react';
import * as Ui from './SearchBar.styles';
import { useDebouncedCallback } from '@tanstack/react-pacer';

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
} & React.ComponentProps<typeof Ui.Container>;

const SearchBar = ({ onSearch, placeholder = 'Search...', ...props }: Props) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedOnSearch = useDebouncedCallback(
    (query: string) => {
      onSearch(query);
    },
    { wait: 300 },
  );

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedOnSearch(e.target.value);
  };

  return (
    <Ui.Container {...props}>
      <Ui.SearchIcon />
      <Ui.Input ref={inputRef} type="text" value={query} onChange={handleInputChange} placeholder={placeholder} />
      {query && (
        <Ui.ClearButton onClick={clearSearch}>
          <Ui.ClearIcon />
        </Ui.ClearButton>
      )}
    </Ui.Container>
  );
};

export default SearchBar;

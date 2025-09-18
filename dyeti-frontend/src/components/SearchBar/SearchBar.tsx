import { useEffect, useRef, useState } from 'react';
import * as Ui from './SearchBar.styles';
import { useDebounce } from '@/hooks/useDebounce';

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
} & React.ComponentProps<typeof Ui.Container>;

const SearchBar = ({ onSearch, placeholder = 'Search...', ...props }: Props) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [onSearch, debouncedQuery]);

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <Ui.Container {...props}>
      <Ui.SearchIcon />
      <Ui.Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      {query && (
        <Ui.ClearButton onClick={clearSearch}>
          <Ui.ClearIcon />
        </Ui.ClearButton>
      )}
    </Ui.Container>
  );
};

export default SearchBar;

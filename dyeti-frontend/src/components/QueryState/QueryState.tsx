import { ReactNode } from 'react';
import * as Ui from './QueryState.styles.ts';
import { Spinner } from '@/components';

type Props = {
  isLoading: boolean;
  isError: boolean;
  hasData?: boolean; // np. !!products
  loadingText?: string;
  errorText?: string;
  children: ReactNode;
};

const QueryState = ({
  isLoading,
  isError,
  loadingText = 'Loading...',
  errorText = 'Oops! Something went wrong. Try again later.',
  children,
}: Props) => {
  if (isLoading) {
    return (
      <Ui.StatusContainer>
        <Spinner />
        <Ui.StatusText>{loadingText}</Ui.StatusText>
      </Ui.StatusContainer>
    );
  }

  if (isError) {
    return (
      <Ui.StatusContainer>
        <Ui.StatusText>{errorText}</Ui.StatusText>
      </Ui.StatusContainer>
    );
  }

  return <>{children}</>;
};

export default QueryState;

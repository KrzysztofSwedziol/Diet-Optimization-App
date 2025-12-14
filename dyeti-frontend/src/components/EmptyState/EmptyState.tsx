import * as Ui from './EmptyState.styles.ts';
import { ReactNode } from 'react';
type Props = {
  title?: string;
  description?: string;
  isEmpty: boolean;
  children: ReactNode;
};
const EmptyState = ({
  title = 'No data yet',
  description = 'There is no data to display here yet',
  isEmpty,
  children,
}: Props) => {
  if (isEmpty)
    return (
      <Ui.EmptyState>
        <Ui.EmptyTitle>{title}</Ui.EmptyTitle>
        <Ui.EmptyDescription>{description}</Ui.EmptyDescription>
      </Ui.EmptyState>
    );
  return <>{children}</>;
};
export default EmptyState;

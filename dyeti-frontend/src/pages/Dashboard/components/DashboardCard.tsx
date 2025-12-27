import * as Ui from './DashboardCard.styles.ts';
import { IconLike } from '@/types';

type Props = {
  to: string;
  icon: IconLike;
  title: string;
  description: string;
  ariaLabel?: string;
};

const DashboardCard = ({ to, icon: Icon, title, description, ariaLabel }: Props) => {
  return (
    <Ui.TileLink href={to} aria-label={ariaLabel ?? title}>
      <Ui.IconArea>
        <Icon aria-hidden />
      </Ui.IconArea>
      <Ui.BottomRow>
        <Ui.Content>
          <Ui.Title>{title}</Ui.Title>
          <Ui.Desc>{description}</Ui.Desc>
        </Ui.Content>
        <Ui.RightChevron aria-hidden>›</Ui.RightChevron>
      </Ui.BottomRow>
    </Ui.TileLink>
  );
};

export default DashboardCard;

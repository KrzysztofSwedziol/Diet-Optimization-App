export type IconLike = React.ComponentType<{
  size?: number | string;
  className?: string;
  'aria-hidden'?: boolean;
}>;

export type CardCfg = {
  key: string;
  to: string;
  icon: IconLike;
  title: string;
  description: string;
};

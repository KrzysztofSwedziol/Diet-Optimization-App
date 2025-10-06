import React from 'react';
import * as Ui from './Account.styles';

type StatRowProps = {
  label: string;
  value: number;
};

export const StatRow: React.FC<StatRowProps> = ({ label, value }) => {
  return (
    <Ui.Row>
      <Ui.StatLabel>{label}</Ui.StatLabel>
      <Ui.Pill>{value}</Ui.Pill>
    </Ui.Row>
  );
};

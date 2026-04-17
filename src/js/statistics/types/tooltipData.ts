type TooltipData = {
  name: string;
  averageMetascore: number;
  medianMetascore: number;
  gameCount: number;
};

export type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: TooltipData;
  }>;
};

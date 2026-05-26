type ChangeResult = {
  percentageChange: number;
  isIncrease: boolean | 0;
};

export function calculateChange(
  current: number,
  previous: number
): ChangeResult {
  if (previous == 0 && current == 0) {
    return {
      percentageChange: 0,
      isIncrease: false,
    };
  }
  if (previous === 0) {
    return {
      percentageChange: current === 0 ? 0 : 100,
      isIncrease: current > 0,
    };
  }

  const change = current - previous;
  const percentageChange = (change / previous) * 100;

  return {
    percentageChange: parseFloat(percentageChange.toFixed(2)), // rounded to 2 decimal places
    isIncrease: change > 0,
  };
}

export function calculatePortion(value: number, total: number): number {
  if (total === 0) return 0;
  return parseFloat(((value / total) * 100).toFixed(2));
}

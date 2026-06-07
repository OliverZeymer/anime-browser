'use client';

import { useEffect, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { debounce } from 'lodash';
import { Slider } from '../ui/multi-range-slider';

type Props = {
  minScore?: string | number;
  maxScore?: string | number;
  onMinScoreChange?: (value: number) => void;
  onMaxScoreChange?: (value: number) => void;
};

export default function AnimeScoreSlider({ minScore, maxScore, onMinScoreChange, onMaxScoreChange }: Props) {
  const minScoreValue = parseFloat(String(minScore ?? '')) || 0;
  const maxScoreValue = parseFloat(String(maxScore ?? '')) || 10;

  const handleRangeChange = useMemo(
    () =>
      debounce(([newMin, newMax]: number[]) => {
        onMinScoreChange?.(newMin);
        onMaxScoreChange?.(newMax);
      }, 500),
    [onMinScoreChange, onMaxScoreChange]
  );

  useEffect(() => {
    return () => {
      handleRangeChange.cancel();
    };
  }, [handleRangeChange]);

  return (
    <div className='flex flex-col gap-2'>
      <Label className='font-semibold'>Score</Label>
      <Slider className='mt-2' min={0} max={10} step={0.01} value={[minScoreValue, maxScoreValue]} onValueChange={handleRangeChange} />
    </div>
  );
}

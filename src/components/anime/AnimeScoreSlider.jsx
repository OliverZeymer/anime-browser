'use client';

import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Slider } from '../ui/multi-range-slider';
import { debounce } from 'lodash';

export default function AnimeScoreSlider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const minScoreParam = parseFloat(searchParams.get('min_score')) || 0;
  const maxScoreParam = parseFloat(searchParams.get('max_score')) || 10;

  const [minScore, setMinScore] = useState(minScoreParam);
  const [maxScore, setMaxScore] = useState(maxScoreParam);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (minScore === 0) params.delete('min_score');
    else params.set('min_score', minScore.toString());

    if (maxScore === 10) params.delete('max_score');
    else params.set('max_score', maxScore.toString());

    const newURL = `${pathname}?${params.toString()}`;
    router.push(newURL, undefined, { shallow: true });
  }, [minScore, maxScore, pathname, router, searchParams]);

  const handleRangeChange = debounce(([newMin, newMax]) => {
    setMinScore(newMin);
    setMaxScore(newMax);
  }, 500);

  return (
    <div className='flex flex-col gap-2'>
      <Label className='font-semibold'>Score</Label>
      <Slider className='mt-2' min={0} max={10} step={0.01} value={[minScore, maxScore]} range={[minScore, maxScore]} onValueChange={handleRangeChange} />
    </div>
  );
}

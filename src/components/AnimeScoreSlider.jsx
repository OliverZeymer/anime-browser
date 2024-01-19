'use client';

import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Slider } from './ui/multi-range-slider';
import { debounce } from 'lodash';
export default function AnimeScoreSlider({}) {
  const pathname = usePathname();
  const min = 0;
  const max = 10;
  const step = 0.01;
  const router = useRouter();

  const [minScore, setMinScore] = useState(min);
  const [maxScore, setMaxScore] = useState(max);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(router.query);
    const minScoreParam = currentSearchParams.get('min_score');
    const maxScoreParam = currentSearchParams.get('max_score');

    if (minScoreParam) {
      setMinScore(parseFloat(minScoreParam));
    }

    if (maxScoreParam) {
      setMaxScore(parseFloat(maxScoreParam));
    }
  }, [router.query]);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(router.query);

    const minScoreStr = minScore.toString();
    const maxScoreStr = maxScore.toString();

    if (minScore === min) {
      currentSearchParams.delete('min_score');
    } else {
      currentSearchParams.set('min_score', minScoreStr);
    }

    if (maxScore === max) {
      currentSearchParams.delete('max_score');
    } else {
      currentSearchParams.set('max_score', maxScoreStr);
    }

    const newURL = `${pathname}?${currentSearchParams.toString()}`;
    router.push(newURL, undefined, { shallow: true });
  }, [minScore, maxScore, router]);

  const debouncedHandleRangeChange = debounce((value) => {
    setMinScore(value[0]);
    setMaxScore(value[1]);
  }, 500);

  const handleRangeChange = (value) => {
    debouncedHandleRangeChange(value);
  };
  return (
    <div className='flex flex-col gap-2'>
      <Label className='font-semibold'>Score</Label>
      <Slider className='mt-2' min={min} max={max} step={step} range={[minScore, maxScore]} onValueChange={handleRangeChange} />
    </div>
  );
}

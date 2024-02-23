import React, { useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import { Input } from './input';

const Slider = React.forwardRef(({ className, min, max, step, formatLabel, value, onValueChange, ...props }, ref) => {
  const initialValue = Array.isArray(value) ? value : [min, max];
  const [localValues, setLocalValues] = useState(initialValue);
  const handleValueChange = (newValues) => {
    setLocalValues(newValues);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  return (
    <div className='flex flex-col space-y-3'>
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}>
        <SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'>
          <SliderPrimitive.Range className='absolute h-full bg-primary' />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className='block cursor-pointer h-4 w-4 rounded-full border-2 border-primary/20 box-content bg-background shadow transition-colors focus-visible:outline-none focus:border-primary/30 disabled:pointer-events-none disabled:opacity-50' />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
      <div className='flex items-center gap-4 max-w-[250px]'>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            <Input
              type='number'
              value={value}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                if (!isNaN(newValue)) {
                  const newValues = [...localValues];
                  newValues[index] = newValue;
                  if (index === 0 && newValue > newValues[1]) {
                    newValues[0] = newValues[1];
                  } else if (index === 1 && newValue < newValues[0]) {
                    newValues[1] = newValues[0];
                  }
                  handleValueChange(newValues);
                }
              }}
            />
            {index === 0 && <span className='text-primary'>-</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { AnimeStatistics } from '@/types/jikan';

type Props = {
  statistics: AnimeStatistics;
};

export default function AnimeStatisticsCharts({ statistics }: Props) {
  const watchChartData = [
    {
      name: 'Completed',
      viewers: statistics?.completed,
    },
    {
      name: 'Watching',
      viewers: statistics?.watching,
    },
    {
      name: 'Plan to',
      viewers: statistics?.plan_to_watch,
    },
    {
      name: 'Dropped',
      viewers: statistics?.dropped,
    },
    {
      name: 'On Hold',
      viewers: statistics?.on_hold,
    },
  ];
  const watchChartConfig = {
    viewers: {
      label: 'Viewers',
      color: 'hsl(var(--chart-1))',
    },
  };
  const scoreChartConfig = {
    votes: {
      label: 'Votes',
      color: 'var(--animebrowser)',
    },
  };

  return (
    <div className='flex h-full min-h-0 flex-col gap-3'>
      <div className='flex min-h-0 flex-1 flex-col'>
        <h3 className='mb-2 shrink-0 text-base font-bold'>Watch Status</h3>
        <ChartContainer config={watchChartConfig} className='min-h-[100px] flex-1'>
          <BarChart
            margin={{
              top: 28,
            }}
            accessibilityLayer
            data={watchChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              tickFormatter={(tick) => {
                return tick.toLocaleString();
              }}
              dataKey='name'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey='viewers' fill='var(--animebrowser)' radius={8}>
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                formatter={(value) => {
                  const numericValue = typeof value === 'number' ? value : Number(value);

                  return new Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(numericValue);
                }}
                fontSize={14}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
      <div className='flex min-h-0 flex-1 flex-col'>
        <h3 className='mb-2 shrink-0 text-base font-bold'>Score Distribution</h3>
        <ChartContainer config={scoreChartConfig} className='min-h-[100px] flex-1'>
          <RadarChart data={statistics?.scores}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='score' />
            <PolarGrid />
            <Radar
              dataKey='votes'
              fill='var(--animebrowser)'
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </div>
    </div>
  );
}

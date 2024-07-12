'use client';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export default function AnimeStatisticsCharts({ statistics }) {
  console.log(statistics);
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
    <>
      <h3 className='text-lg font-bold mb-3'>Watch Status</h3>
      <ChartContainer config={watchChartConfig}>
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
              formatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value)
              }
              fontSize={14}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <h3 className='text-lg font-bold mt-3'>Score Distribution</h3>
      <ChartContainer config={scoreChartConfig} className='mr-auto aspect-square max-h-[250px] lg:max-h-80'>
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
    </>
  );
}

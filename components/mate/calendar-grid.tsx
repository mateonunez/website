'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { GitHubContributionDay } from '@/types/github';

export interface CalendarGridProps {
  weeks: Array<{
    contributionDays: GitHubContributionDay[];
  }>;
  totalContributions: number;
}

// Helper functions
export function getContributionColor(count: number): string {
  if (count === 0) return 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700';
  if (count < 5) return 'bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800';
  if (count < 10) return 'bg-amber-200 dark:bg-amber-800/40 border border-amber-300 dark:border-amber-700';
  if (count < 20) return 'bg-amber-300 dark:bg-amber-700/50 border border-amber-400 dark:border-amber-600';
  return 'bg-amber-400 dark:bg-amber-600/70 border border-amber-500 dark:border-amber-500';
}

function getMonthLabel(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short' });
}

function getDayOfWeekLabel(index: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[index];
}

export function CalendarGrid({ weeks, totalContributions }: CalendarGridProps) {
  // Generate month labels at the top
  const monthLabels = [];
  if (weeks.length > 0) {
    const firstDate = new Date(weeks[0].contributionDays[0]?.date);
    let currentMonth = firstDate.getMonth();
    let currentLabel = getMonthLabel(firstDate);
    let currentIndex = 0;

    weeks.forEach((week, weekIndex) => {
      if (week.contributionDays[0]) {
        const date = new Date(week.contributionDays[0].date);
        const month = date.getMonth();

        if (month !== currentMonth) {
          // Add the previous month label
          monthLabels.push({
            label: currentLabel,
            index: currentIndex,
            width: weekIndex - currentIndex,
          });

          currentMonth = month;
          currentLabel = getMonthLabel(date);
          currentIndex = weekIndex;
        }
      }
    });

    // Add the last month
    if (currentIndex < weeks.length) {
      monthLabels.push({
        label: currentLabel,
        index: currentIndex,
        width: weeks.length - currentIndex,
      });
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto pb-2">
        {/* Month labels */}
        <div className="flex mt-2 mb-1 pl-10">
          {monthLabels.map((month, idx) => (
            <div
              key={`${month.label}-${idx}`}
              className="text-xs text-muted-foreground"
              style={{
                width: `${month.width * 16}px`,
                marginLeft: idx === 0 ? `${month.index * 16}px` : 0,
                textAlign: 'left',
              }}
            >
              {month.label}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Day of week labels */}
          <div className="flex flex-col justify-around mr-2 text-xs text-muted-foreground h-[112px]">
            {[0, 2, 4, 6].map((day) => (
              <div key={day} className="h-3.5 flex items-center">
                {getDayOfWeekLabel(day)}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="grid grid-flow-col gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-flow-row gap-[3px]">
                {Array(7)
                  .fill(0)
                  .map((_, dayIndex) => {
                    const day = week.contributionDays.find((d) => new Date(d.date).getDay() === dayIndex);
                    const count = day ? day.contributionCount : 0;

                    if (!day) {
                      return (
                        <div
                          key={dayIndex}
                          className={`h-3.5 w-3.5 rounded-sm transition-colors ${getContributionColor(count)}`}
                        />
                      );
                    }

                    return (
                      <Tooltip key={dayIndex}>
                        <TooltipTrigger asChild>
                          <div className={`h-3.5 w-3.5 rounded-sm transition-colors ${getContributionColor(count)}`} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <div className="font-medium">
                              {new Date(day.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <span>
                                {day.contributionCount} contribution{day.contributionCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold">{totalContributions.toLocaleString()}</span> contributions in the last year
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-1">Less</span>
          {[0, 4, 9, 19, 30].map((level) => (
            <div key={level} className={`h-3.5 w-3.5 rounded-sm ${getContributionColor(level)}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">More</span>
        </div>
      </div>
    </div>
  );
}

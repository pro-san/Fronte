import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { TrendingDown, TrendingUp, Clock, Users, Activity } from 'lucide-react';

interface WaitTrendItem {
  hourLabel: string;
  waitMinutes: number;
  patientsWaiting: number;
}

interface EmergencyWaitChartProps {
  campusName: string;
  trendData: WaitTrendItem[];
  currentWaitMinutes: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: WaitTrendItem;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const item = payload[0].payload;
    const isNow = item.hourLabel.includes('Now');

    return (
      <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-xl border border-slate-700 text-xs">
        <div className="font-semibold text-slate-200 flex items-center justify-between gap-4">
          <span>{item.hourLabel}</span>
          {isNow && (
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-medium">
              Live
            </span>
          )}
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-lg font-bold font-mono text-teal-300">
            {item.waitMinutes}
          </span>
          <span className="text-slate-400 text-[11px]">minutes wait</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
          <Users className="w-3 h-3 text-slate-400" />
          <span>{item.patientsWaiting} active patients in triage queue</span>
        </div>
      </div>
    );
  }
  return null;
};

export const EmergencyWaitChart: React.FC<EmergencyWaitChartProps> = ({
  campusName,
  trendData,
  currentWaitMinutes,
}) => {
  if (!trendData || trendData.length === 0) return null;

  const waitValues = trendData.map((d) => d.waitMinutes);
  const peakWait = Math.max(...waitValues);
  const lowestWait = Math.min(...waitValues);
  const avgWait = Math.round(
    waitValues.reduce((acc, curr) => acc + curr, 0) / waitValues.length
  );

  const initialWait = trendData[0]?.waitMinutes ?? currentWaitMinutes;
  const isTrendingDown = currentWaitMinutes <= initialWait;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      {/* Top Header of Chart */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-700" />
            <h4 className="text-sm font-bold text-slate-900">
              6-Hour Historical Wait Time Trend
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hourly recorded nurse triage velocity at <span className="font-semibold text-slate-700">{campusName}</span>
          </p>
        </div>

        {/* Trend summary badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
              isTrendingDown
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {isTrendingDown ? (
              <>
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Trending Down ({initialWait - currentWaitMinutes}m drop)</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Volume Surge (+{currentWaitMinutes - initialWait}m)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mini Bar Chart Container */}
      <div className="mt-4 pt-1">
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trendData}
              margin={{ top: 12, right: 8, left: -24, bottom: 0 }}
            >
              <XAxis
                dataKey="hourLabel"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                unit="m"
                domain={[0, Math.max(30, peakWait + 5)]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
              />
              <Bar dataKey="waitMinutes" radius={[4, 4, 0, 0]} maxBarSize={36}>
                {trendData.map((entry, index) => {
                  const isCurrent = entry.hourLabel.includes('Now');
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={isCurrent ? '#0f766e' : '#94a3b8'}
                      className="transition-colors hover:opacity-85"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center text-xs">
        <div className="bg-slate-50 p-2 rounded-lg">
          <div className="text-[11px] text-slate-500">6-Hour Peak</div>
          <div className="font-mono font-bold text-slate-900 mt-0.5">{peakWait} mins</div>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <div className="text-[11px] text-slate-500">6-Hour Average</div>
          <div className="font-mono font-bold text-slate-900 mt-0.5">{avgWait} mins</div>
        </div>
        <div className="bg-teal-50/70 p-2 rounded-lg border border-teal-100">
          <div className="text-[11px] text-teal-800 font-medium">Current Wait</div>
          <div className="font-mono font-bold text-teal-900 mt-0.5">{currentWaitMinutes} mins</div>
        </div>
      </div>
    </div>
  );
};

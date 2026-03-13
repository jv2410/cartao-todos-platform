interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  backgroundColor?: string;
  textColor?: string;
}

export default function StatsCard({
  icon,
  label,
  value,
  unit = '',
  trend,
  backgroundColor = 'bg-white',
  textColor = 'text-gray-900'
}: StatsCardProps) {
  return (
    <div className={`${backgroundColor} rounded-lg shadow p-6`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className={`text-3xl font-semibold ${textColor}`}>
            {value}{unit}
          </p>
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              {trend.direction === 'up' ? (
                <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <span className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                {trend.percentage.toFixed(1)}%
              </span>
              <span className="text-gray-500 ml-1">vs yesterday</span>
            </div>
          )}
        </div>
        <div className="text-4xl ml-4">{icon}</div>
      </div>
    </div>
  );
}

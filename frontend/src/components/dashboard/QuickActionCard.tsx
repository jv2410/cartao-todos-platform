import Link from 'next/link';

interface QuickActionCardProps {
  icon: string;
  label: string;
  description: string;
  href: string;
}

export default function QuickActionCard({
  icon,
  label,
  description,
  href
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-500"
    >
      <div className="flex items-start">
        <div className="text-3xl mr-4">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}

interface SectionItemProps {
  href: string;
  label: string;
}

export default function SectionItem({ href, label}: SectionItemProps) {
  return (
    <li>
      <a href={href} className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors}`}>
        <span className="font-medium">{label}</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* DESENHO DAS SETINHAS*/}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </li>
  );
}
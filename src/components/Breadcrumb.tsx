import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  activeTab: 'allocation' | 'chat' | 'shelter';
}

export default function Breadcrumb({ activeTab }: BreadcrumbProps) {
  const paths = {
    allocation: ['Home', 'Resource Allocation'],
    chat: ['Home', 'Emergency Communication'],
    shelter: ['Home', 'Find Shelter']
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {paths[activeTab].map((path, index) => (
          <React.Fragment key={path}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            )}
            <li>
              <span className={`text-sm ${
                index === paths[activeTab].length - 1
                  ? 'font-medium text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {path}
              </span>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
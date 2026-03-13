'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHeader({ title, description, action, breadcrumbs }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-8"
    >
      {/* Breadcrumbs (optional) */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-4 flex items-center gap-2 text-sm"
        >
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-secondary-500 hover:text-primary-600 transition-colors duration-200"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-secondary-900 font-medium">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="text-secondary-300">/</span>
              )}
            </div>
          ))}
        </motion.nav>
      )}

      {/* Header Content */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          {/* Title with gradient effect */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl font-bold bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-700 bg-clip-text text-transparent mb-2"
          >
            {title}
          </motion.h1>

          {/* Description with fade-in */}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-base text-secondary-600 max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Action Button (optional) */}
        {action && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-shrink-0"
          >
            {action}
          </motion.div>
        )}
      </div>

      {/* Decorative bottom border with gradient */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-6 h-px bg-gradient-to-r from-primary-500/20 via-primary-500/50 to-transparent origin-left"
      />
    </motion.div>
  );
}

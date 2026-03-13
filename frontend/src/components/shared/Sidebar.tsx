'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import {
  LayoutDashboard,
  Send,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  username: string;
  onLogout: () => void;
}

export function Sidebar({ username, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Send, label: 'Disparos', path: '/disparos' },
    { icon: FileText, label: 'Templates', path: '/templates' },
    { icon: BarChart3, label: 'Campanhas', path: '/campanhas' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Logo Section with subtle animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="p-6 border-b border-secondary-100"
      >
        <Logo
          width={140}
          height={36}
          className="h-9 w-auto"
          linkTo="/dashboard"
        />
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          const isHovered = hoveredItem === item.path;

          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              onClick={() => handleNavigation(item.path)}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                relative w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-250 ease-apple
                group overflow-hidden
                ${isActive
                  ? 'text-primary-700 font-medium'
                  : 'text-secondary-700 hover:text-secondary-900'
                }
              `}
            >
              {/* Active/Hover Background with gradient */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : isHovered ? 0.5 : 0,
                  scale: isActive ? 1 : isHovered ? 0.95 : 0.9,
                }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className={`
                  absolute inset-0 rounded-lg
                  ${isActive
                    ? 'bg-gradient-to-br from-primary-50 to-primary-100/50'
                    : 'bg-secondary-100'
                  }
                `}
              />

              {/* Glow effect on active */}
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(0, 169, 136, 0.1), transparent 70%)',
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon with animation */}
              <motion.div
                animate={{
                  scale: isActive || isHovered ? 1.1 : 1,
                  rotate: isActive || isHovered ? [0, -10, 10, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-secondary-500 group-hover:text-secondary-700'
                  }`}
                />
              </motion.div>

              {/* Label */}
              <span className="relative z-10">{item.label}</span>

              {/* Chevron on hover */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isHovered && !isActive ? 1 : 0,
                  x: isHovered && !isActive ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10 ml-auto"
              >
                <ChevronRight className="w-4 h-4 text-secondary-400" />
              </motion.div>
            </motion.button>
          );
        })}
      </nav>

      {/* User Section with elevation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="p-4 border-t border-secondary-100"
      >
        {/* User Card with glassmorphism effect */}
        <div className="px-4 py-3 mb-3 rounded-xl bg-gradient-to-br from-secondary-50 to-white shadow-elevation-1 border border-secondary-100/50 backdrop-blur-xl hover:shadow-elevation-2 transition-all duration-250 ease-apple">
          <p className="text-sm font-semibold text-secondary-900">{username}</p>
          <p className="text-xs text-secondary-500 mt-0.5">Administrador</p>
        </div>

        {/* Logout Button with hover effect */}
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error-600 hover:bg-error-50 transition-all duration-200 ease-apple group"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <LogOut className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">Sair</span>
        </motion.button>
      </motion.div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button with glassmorphism */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 backdrop-blur-xl bg-white/80 rounded-xl shadow-elevation-3 border border-white/20 hover:shadow-elevation-4 transition-all duration-200 ease-apple"
      >
        <AnimatePresence mode="wait">
          {isMobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-secondary-700" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-secondary-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay with backdrop blur */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 backdrop-blur-md bg-secondary-900/40 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop with subtle shadow */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white/95 backdrop-blur-xl border-r border-secondary-100 fixed inset-y-0 left-0 shadow-elevation-2">
        {sidebarContent}
      </aside>

      {/* Sidebar - Mobile with slide-in animation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200
            }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-secondary-100 flex flex-col shadow-elevation-5"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

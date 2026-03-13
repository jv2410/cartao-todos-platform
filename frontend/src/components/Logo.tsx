import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  linkTo?: string
  priority?: boolean
  responsive?: boolean
}

/**
 * Cartão de Todos Logo Component
 *
 * A reusable logo component that displays the brand logo with proper sizing and linking.
 *
 * @param width - Logo width in pixels (default: 123)
 * @param height - Logo height in pixels (default: 32)
 * @param className - Additional CSS classes
 * @param linkTo - URL to link to (default: '/')
 * @param priority - Whether to prioritize loading (default: true)
 * @param responsive - Enable responsive sizing (default: true)
 *
 * @example
 * ```tsx
 * // Default usage in header with responsive sizing
 * <Logo />
 *
 * // Custom size without responsive behavior
 * <Logo width={100} height={26} responsive={false} />
 *
 * // Without link wrapper
 * <Logo linkTo="" />
 * ```
 */
export function Logo({
  width = 123,
  height = 32,
  className = '',
  linkTo = '/',
  priority = true,
  responsive = true
}: LogoProps) {
  // Responsive sizing classes for mobile, tablet, desktop
  const responsiveClasses = responsive
    ? 'w-[80px] h-[21px] sm:w-[100px] sm:h-[26px] md:w-[123px] md:h-[32px]'
    : ''

  const combinedClassName = responsive
    ? `${responsiveClasses} ${className}`.trim()
    : className

  const logoImage = (
    <Image
      src="/logo.svg"
      alt="Cartão de Todos"
      width={width}
      height={height}
      priority={priority}
      className={combinedClassName}
    />
  )

  // If no link is provided, return just the image
  if (!linkTo) {
    return logoImage
  }

  // Return wrapped in a link
  return (
    <Link
      href={linkTo}
      aria-label="Cartão de Todos - Return to homepage"
      className="inline-block"
    >
      {logoImage}
    </Link>
  )
}

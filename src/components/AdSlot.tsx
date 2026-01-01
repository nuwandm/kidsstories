import { AdSlotProps } from '@/lib/types';

/**
 * Modern AdSlot Component
 *
 * Placeholder for Google AdSense integration.
 * Replace with actual AdSense code after approval.
 *
 * Guidelines:
 * - Ads should NOT interrupt content flow
 * - Maximum 3 ad units per page
 * - Content must be visible above ads
 */
export function AdSlot({
  slotId,
  format = 'horizontal',
  className = '',
}: AdSlotProps) {
  const formatClasses = {
    horizontal: 'h-24 sm:h-28',
    vertical: 'h-64 w-40',
    square: 'h-64 w-64',
  };

  return (
    <aside
      className={`
        ${formatClasses[format]}
        ${className}
        relative overflow-hidden
        bg-gradient-to-r from-slate-50 via-white to-slate-50
        border-2 border-dashed border-slate-200
        rounded-kid-lg
        flex items-center justify-center
      `}
      role="complementary"
      aria-label="Advertisement"
      data-ad-slot={slotId}
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239333ea' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative text-center p-4">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-display font-semibold">
          Advertisement
        </p>
        <p className="text-xs text-slate-300 mt-1">Ad Slot: {slotId}</p>
      </div>
    </aside>
  );
}

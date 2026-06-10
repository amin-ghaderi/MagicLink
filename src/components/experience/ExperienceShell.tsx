import { cn } from '@/lib/utils';
import type { ThemeDefinition } from '@/lib/themes';
import { ThemeDecorations } from './ThemeDecorations';

interface ExperienceShellProps {
  theme: ThemeDefinition;
  children: React.ReactNode;
  showDecorations?: boolean;
}

export function ExperienceShell({
  theme,
  children,
  showDecorations = true,
}: ExperienceShellProps) {
  return (
    <div
      className={cn(
        'relative min-h-screen bg-gradient-to-br text-white',
        theme.pageGradient,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]',
          theme.glow,
        )}
      />
      {showDecorations && <ThemeDecorations theme={theme} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

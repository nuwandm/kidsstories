/**
 * Story Page Layout
 *
 * Minimal layout for fullscreen story reading experience.
 * The BookReader component handles hiding parent layout elements.
 */

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

// components/ui/EmptyState.tsx
interface EmptyStateProps {
  message: string;
  icon?: string;
}

export function EmptyState({ message, icon = "📰" }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        {message}
      </p>
    </div>
  );
}
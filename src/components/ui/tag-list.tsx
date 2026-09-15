import { Badge } from "@/components/ui/badge";

type TagListProps = {
  label?: string;
  tags: readonly string[];
};

export function TagList({ label = "Topics", tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {tags.map((tag) => <li key={tag}><Badge>{tag}</Badge></li>)}
    </ul>
  );
}

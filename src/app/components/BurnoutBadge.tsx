import { BurnoutLevel, LEVEL_META } from "../store/store";
import { Badge } from "./ui/badge";

export function BurnoutBadge({ level }: { level: BurnoutLevel }) {
  const meta = LEVEL_META[level];
  return (
    <Badge className={`${meta.bg} ${meta.text} border-transparent`}>
      {meta.label}
    </Badge>
  );
}

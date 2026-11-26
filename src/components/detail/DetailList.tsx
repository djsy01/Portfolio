interface Props {
  items: string[];
  className: string;
  emphasizeLabels?: boolean;
}

function featureText(item: string) {
  const separator = item.indexOf(': ');
  if (separator < 1 || separator > 20) return item;
  return <><strong>{item.slice(0, separator)}</strong>{item.slice(separator)}</>;
}

export function DetailList({ items, className, emphasizeLabels }: Props) {
  return (
    <ul className={className}>
      {items.map((item) => <li key={item}>{emphasizeLabels ? featureText(item) : item}</li>)}
    </ul>
  );
}

type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="section-label inline-flex items-center gap-2">
      <span className="w-8 h-px bg-accent-500" aria-hidden="true" />
      {children}
    </span>
  );
}

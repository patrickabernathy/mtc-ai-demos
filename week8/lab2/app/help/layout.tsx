export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="crumb">Help Center</p>
      {children}
    </div>
  );
}

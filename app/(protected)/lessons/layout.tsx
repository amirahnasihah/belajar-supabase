import ProtectedLayout from "@/components/ProtectedLayout";

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

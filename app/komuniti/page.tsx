import { ResourceSharing } from "@/components/komuniti/ResourceSharing";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Learning Resources
        </h1>
        <ResourceSharing />
      </div>
    </div>
  );
}

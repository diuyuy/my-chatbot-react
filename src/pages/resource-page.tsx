import { EmbeddingsList } from "@/features/workspaces/components/embedding-list";
import type { ResourceDetail } from "@/features/workspaces/types/rag.type";
import { useLoaderData } from "react-router";

export default function ResourcePage() {
  const resource = useLoaderData<ResourceDetail>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{resource.name}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="capitalize">{resource.fileType}</span>
          <span>•</span>
          <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <EmbeddingsList
        embeddings={resource.embeddings}
        resourceId={resource.id}
        resourceName={resource.name}
      />
    </div>
  );
}

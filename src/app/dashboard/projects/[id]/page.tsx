import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { TaskBoard } from "~/components/shared/TaskBoard";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { DeleteProjectButton } from "~/components/shared/DeleteProjectButton";
import { ProjectHeader } from "~/components/shared/ProjectHeader";
import { ProjectAnalytics } from "~/components/shared/ProjectAnalytics";
import { ArrowLeft } from "lucide-react";

export default async function ProjectPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // Next.js 15 requires dynamic route parameter objects to be explicitly awaited!
    const { id } = await params;

    try {
        // Securely fetch project records linked to the verified active tenant workspace context
        const project = await api.project.getById({ id });

        return (
            <div className="w-full space-y-6">
                {/* MODERN BREADCRUMB / ACTION BAR */}
                <div className="flex items-center justify-between">
                    <Link href="/dashboard">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground -ml-2 transition-colors gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Overview
                        </Button>
                    </Link>
                </div>

                {/* THE NODE IDENTITY CONTAINER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
                    <div className="flex-1">
                        <ProjectHeader projectId={project.id} initialName={project.name} />
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                            PROJECT_UUID: {project.id}
                        </p>
                    </div>
                    <div className="flex items-center shrink-0">
                        <DeleteProjectButton projectId={project.id} />
                    </div>
                </div>

                {/* METRIC SUMMARIES LAYER */}
                <div className="max-w-4xl">
                    <ProjectAnalytics projectId={project.id} />
                </div>

                {/* THE UNCONSTRAINED KANBAN CANVAS */}
                <div className="pt-4">
                    <TaskBoard projectId={project.id} />
                </div>
            </div>
        );
    } catch (error) {
        // Cascade structural query failures or authorization leaks straight into a secure 404
        notFound();
    }
}
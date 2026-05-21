import Link from "next/link";
import { api } from "~/trpc/server";
import { CreateProjectForm } from "~/components/shared/CreateProjectForm";
import { CreateOrganization } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Folder, Plus } from "lucide-react";

export default async function DashboardPage() {
    const { orgId } = await auth();

    // 1. THE CHECKPOINT: Workspace onboarding fallback
    if (!orgId) {
        return (
            <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center p-4">
                <div className="max-w-md space-y-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Welcome! Let&apos;s set up your first workspace.
                    </h1>
                    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                        <CreateOrganization />
                    </div>
                </div>
            </div>
        );
    }

    // 2. THE DATA INJECTION: Fetching projects tied to this workspace
    const projects = await api.project.getAll();

    return (
        <div className="space-y-10">
            {/* PAGE SECTION HEADER */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your active engineering nodes and workspace environments.
                </p>
            </div>

            {/* DASHBOARD GRID SYSTEM */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">

                {/* ACTIVE PROJECTS LIST CONTAINER (TAKES 2 COLS ON WIDE SCREENS) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 font-medium text-sm text-muted-foreground">
                        <Folder className="h-4 w-4" />
                        <h2>Active Projects ({projects.length})</h2>
                    </div>

                    {projects.length === 0 ? (
                        <div className="rounded-md border border-dashed border-border bg-card p-12 text-center text-muted-foreground text-sm">
                            No projects found in this workspace. Provision one to get started.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/dashboard/projects/${project.id}`}
                                    className="group rounded-md border border-border bg-card p-5 transition-all hover:border-white/20 hover:bg-white/[0.02]"
                                >
                                    <div className="flex flex-col h-full justify-between gap-8">
                                        <div>
                                            <span className="font-semibold text-foreground group-hover:text-white transition-colors block text-base">
                                                {project.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground mt-1 block font-mono">
                                                NODE_ID: {project.id.slice(0, 8)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                                            <span>Standard Environment</span>
                                            <span>{project.createdAt.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* PROJECT CREATION CONTROL DESK (TAKES 1 COL ON WIDE SCREENS) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-medium text-sm text-muted-foreground">
                        <Plus className="h-4 w-4" />
                        <h2>Provision New Engine</h2>
                    </div>
                    <div className="rounded-md border border-border bg-card p-5">
                        <CreateProjectForm />
                    </div>
                </div>

            </div>
        </div>
    );
}
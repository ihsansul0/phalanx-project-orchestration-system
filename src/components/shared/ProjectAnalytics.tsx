"use client";

import { api } from "~/trpc/react";
import { BarChart3 } from "lucide-react";

export function ProjectAnalytics({ projectId }: { projectId: string }) {
    const { data: stats, isLoading } = api.task.getProjectStats.useQuery({ projectId });

    if (isLoading) {
        return (
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground animate-pulse py-6 border border-border rounded-md bg-card px-5 h-24">
                <span>COMPUTING_VELOCITY_METRICS...</span>
            </div>
        );
    }

    const safeStats = stats ?? { totalTasks: 0, completedTasks: 0, progressPercentage: 0 };

    return (
        <div className="rounded-md border border-border bg-card p-5 shadow-none">
            <div className="mb-4 flex items-end justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                        <BarChart3 className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span>System Velocity</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{safeStats.completedTasks}</span> of <span className="font-semibold text-foreground">{safeStats.totalTasks}</span> task nodes resolved
                    </p>
                </div>
                <div className="text-3xl font-bold tracking-tight font-mono text-foreground">
                    {safeStats.progressPercentage}%
                </div>
            </div>

            {/* The Minimalist High-Density Progress Track */}
            <div className="h-1.5 w-full overflow-hidden rounded-sm bg-neutral-900 border border-border/20">
                <div
                    className="h-full bg-white transition-all duration-500 ease-in-out"
                    style={{ width: `${safeStats.progressPercentage}%` }}
                />
            </div>
        </div>
    );
}
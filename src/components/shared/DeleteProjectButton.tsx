"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
    const router = useRouter();

    const deleteProject = api.project.delete.useMutation({
        onSuccess: () => {
            router.push("/dashboard");
            router.refresh();
        },
    });

    return (
        <Button
            variant="outline"
            disabled={deleteProject.isPending}
            onClick={() => {
                if (window.confirm("CRITICAL WARNING: Purge this project engine along with all associated task nodes permanently? This action overrides system memory and cannot be undone.")) {
                    deleteProject.mutate({ id: projectId });
                }
            }}
            // Leverages border transparency controls to soften the initial visual presence
            className="border-red-500/20 text-red-400 bg-transparent hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-300 font-medium transition-all gap-2 h-9"
        >
            <Trash2 className="h-4 w-4 shrink-0" />
            <span>{deleteProject.isPending ? "Purging Node..." : "Purge Project"}</span>
        </Button>
    );
}
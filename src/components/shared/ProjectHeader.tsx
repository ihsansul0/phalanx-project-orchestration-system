"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Edit2 } from "lucide-react";

export function ProjectHeader({ projectId, initialName }: { projectId: string; initialName: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    const router = useRouter();

    const updateProject = api.project.update.useMutation({
        onSuccess: () => {
            setIsEditing(false);
            router.refresh();
        }
    });

    if (isEditing) {
        return (
            <div className="flex flex-col gap-2 max-w-xl">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // Perfectly matched text sizing and removed background boxes
                        className="bg-transparent text-3xl font-bold tracking-tight text-foreground border-b border-white/20 outline-none focus:border-white/60 pb-1 flex-1 transition-colors"
                        autoFocus
                    />
                    <div className="flex items-center gap-1.5 shrink-0">
                        <Button
                            size="sm"
                            onClick={() => updateProject.mutate({ id: projectId, name })}
                            disabled={updateProject.isPending || !name.trim()}
                            className="h-8 font-medium"
                        >
                            {updateProject.isPending ? "Saving..." : "Save"}
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                setName(initialName);
                                setIsEditing(false);
                            }}
                            className="h-8 text-muted-foreground hover:text-white"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>

                {updateProject.error && (
                    <p className="text-xs font-mono text-red-400 mt-1">
                        {updateProject.error.data?.zodError?.fieldErrors?.name?.[0] ?? updateProject.error.message}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="group flex items-center gap-3 select-none">
            <h1
                className="cursor-pointer text-3xl font-bold tracking-tight text-foreground transition-colors hover:text-white/80"
                onClick={() => setIsEditing(true)}
                title="Click to change project signature"
            >
                {initialName}
            </h1>
            {/* Added a clean, subtle visual indicator showing the text can be edited */}
            <Edit2 className="h-3.5 w-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
}
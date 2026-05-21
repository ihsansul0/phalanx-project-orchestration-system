"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Terminal } from "lucide-react";

export function CreateProjectForm() {
    const [name, setName] = useState("");
    const router = useRouter();

    const createProject = api.project.create.useMutation({
        onSuccess: () => {
            setName("");
            router.refresh();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) createProject.mutate({ name });
            }}
            className="space-y-4"
        >
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground/60">
                    <Terminal className="h-3.5 w-3.5" />
                    Engine Identifier
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="e.g., Alpha Core, Titan System"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 rounded-md border border-border bg-neutral-900/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-white/20 transition-all"
                        disabled={createProject.isPending}
                    />
                    <Button
                        type="submit"
                        disabled={!name.trim() || createProject.isPending}
                        className="font-medium tracking-tight h-9 shrink-0"
                    >
                        {createProject.isPending ? "Deploying..." : "Deploy Engine"}
                    </Button>
                </div>
            </div>

            {createProject.error && (
                <p className="text-xs font-mono text-red-400">
                    {createProject.error.data?.zodError?.fieldErrors?.name?.[0] ?? createProject.error.message}
                </p>
            )}
        </form>
    );
}
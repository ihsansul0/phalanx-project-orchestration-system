"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Folder, ChevronRight } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";

import { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";

interface NavProject {
    id: string;
    name: string;
}

// THE SIDEBAR NAVIGATION ENGINE: Tracks and highlights active routes
export function SidebarLinks({ projects }: { projects: NavProject[] }) {
    const pathname = usePathname();

    return (
        <div className="space-y-6">
            {/* OVERVIEW ACTION BLOCK */}
            <div className="space-y-1">
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${pathname === "/dashboard"
                        ? "bg-white/10 text-white font-semibold"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        }`}
                >
                    <LayoutDashboard className="h-4 w-4" />
                    Overview
                </Link>
            </div>

            {/* RE-ACTIVE PROJECT DATA FEED */}
            <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono font-medium uppercase tracking-widest text-muted-foreground/40 block mb-2">
                    Active Environments
                </span>
                <div className="space-y-0.5 max-h-[340px] overflow-y-auto pr-1">
                    {projects.length === 0 ? (
                        <span className="px-3 text-xs text-muted-foreground/30 italic block py-1">
                            No engines provisioned
                        </span>
                    ) : (
                        projects.map((project) => {
                            const projectPath = `/dashboard/projects/${project.id}`;
                            const isActive = pathname === projectPath;

                            return (
                                <Link
                                    key={project.id}
                                    href={projectPath}
                                    className={`flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all truncate group ${isActive
                                        ? "bg-white/5 text-white border-l-2 border-white pl-2.5 rounded-l-none font-semibold"
                                        : "text-muted-foreground hover:bg-white/[0.02] hover:text-foreground"
                                        }`}
                                >
                                    <Folder className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-muted-foreground/60 group-hover:text-foreground"}`} />
                                    <span className="truncate">{project.name}</span>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

// THE DYNAMIC BREADCRUMB CORE: Reads current path context strings
export function TopbarBreadcrumb({ projects }: { projects: NavProject[] }) {
    const pathname = usePathname();
    const { organization, isLoaded } = useOrganization();

    const isOverview = pathname === "/dashboard";
    const currentProjectId = pathname.startsWith("/dashboard/projects/")
        ? pathname.split("/")[3]
        : null;

    const activeProject = projects.find(p => p.id === currentProjectId);

    // Fallback to "Workspace" if Clerk is still mounting or loading active context tokens
    const workspaceName = isLoaded && organization ? organization.name : "Workspace";

    return (
        <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-tight text-muted-foreground select-none">
            <span className="hover:text-foreground transition-colors max-w-[120px] truncate">
                {workspaceName}
            </span>
            <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
            {isOverview ? (
                <span className="text-foreground">Overview</span>
            ) : activeProject ? (
                <>
                    <Link href="/dashboard" className="hover:text-foreground transition-colors">Projects</Link>
                    <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
                    <span className="text-white font-semibold truncate max-w-[160px]">{activeProject.name}</span>
                </>
            ) : (
                <span className="text-foreground">Node Console</span>
            )}
        </div>
    );
}

// THE TACTICAL MOBILE MENU OVERLAY DRAWER
export function MobileMenu({ projects }: { projects: NavProject[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Intercept navigation events to cycle the open state down automatically
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div className="md:hidden flex items-center shrink-0">
            <button
                onClick={() => setIsOpen(true)}
                className="p-1.5 rounded-md border border-border/40 bg-neutral-950 text-muted-foreground hover:text-white transition-all active:scale-[0.97]"
                aria-label="Open System Console Drawer"
            >
                <Menu className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex animate-in fade-in duration-200">

                    {/* Drawer Console Content Block */}
                    <div className="w-72 bg-[#050505] h-full border-r border-border flex flex-col p-4 justify-between animate-in slide-in-from-left duration-200">

                        <div className="space-y-6">
                            {/* Drawer Header & Identity Node */}
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="12" cy="12" r="8" />
                                        <path d="M12 2v20" />
                                    </svg>
                                    <span className="font-mono text-xs font-black tracking-[0.2em] text-white uppercase">
                                        Phalanx
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-md text-muted-foreground hover:text-white transition-all"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Organization Context Scope Hook */}
                            <div className="px-1">
                                <OrganizationSwitcher
                                    hidePersonal
                                    organizationProfileMode="navigation"
                                    organizationProfileUrl="/dashboard/settings?tab=workspace"
                                    afterSelectOrganizationUrl="/dashboard"
                                />
                            </div>

                            {/* Navigation Links Rails */}
                            <nav className="px-1 pt-2">
                                <SidebarLinks projects={projects} />
                            </nav>
                        </div>

                        {/* Drawer Bottom Configuration Link */}
                        <div className="border-t border-border pt-4">
                            <Link
                                href="/dashboard/settings"
                                className="flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-all"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        </div>
                    </div>

                    {/* Dark Background Backdrop Catch Zone (Closes menu when clicking outside area) */}
                    <div className="flex-1 h-full" onClick={() => setIsOpen(false)} />
                </div>
            )}
        </div>
    );
}
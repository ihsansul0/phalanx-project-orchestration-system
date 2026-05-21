"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OrganizationProfile, UserProfile } from "@clerk/nextjs";
import { Shield, User, Building2 } from "lucide-react";

type SettingsTab = "workspace" | "account";

function SettingsControlDeck() {
    const searchParams = useSearchParams();
    // Reads the live token from the browser query string
    const urlTab = searchParams.get("tab") as SettingsTab | null;

    const [activeTab, setActiveTab] = useState<SettingsTab>("workspace");

    // Listens to URL shifts reactively—swaps tabs instantly if the user clicks between triggers
    useEffect(() => {
        if (urlTab === "workspace" || urlTab === "account") {
            setActiveTab(urlTab);
        }
    }, [urlTab]);

    const sharedClerkAppearance = {
        elements: {
            navbar: "border-r border-border/40 pr-4 bg-transparent",
            pageScrollable: "pl-6 bg-transparent",
            card: "border-0 shadow-none bg-transparent p-0 w-full max-w-full",
            navbarButtonsContainer: "gap-1",
            navbarButton: "text-muted-foreground hover:bg-white/5 hover:text-foreground text-sm font-medium rounded-md transition-all px-3 py-2",
            navbarButton__active: "bg-white/10 text-white font-semibold border-0",
        }
    };

    return (
        <div className="w-full space-y-6 max-w-5xl animate-in fade-in duration-200">
            {/* SEGMENT HEADLINE IDENTITY */}
            <div className="border-b border-border pb-4">
                <div className="flex items-center gap-2.5 text-xs font-mono text-muted-foreground/80 uppercase tracking-wider mb-1">
                    <Shield className="h-3.5 w-3.5 text-muted-foreground/50" />
                    System Configuration
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Control Deck Settings
                </h1>
            </div>

            {/* DUAL-TIER SUB-TAB ROUTING NAVIGATION */}
            <div className="flex gap-2 border-b border-border/40 pb-px">
                <button
                    onClick={() => setActiveTab("workspace")}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border-b-2 -mb-px ${activeTab === "workspace"
                        ? "border-white text-white font-bold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Building2 className="h-3.5 w-3.5" />
                    Workspace Profile
                </button>
                <button
                    onClick={() => setActiveTab("account")}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border-b-2 -mb-px ${activeTab === "account"
                        ? "border-white text-white font-bold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <User className="h-3.5 w-3.5" />
                    Personal Account
                </button>
            </div>

            {/* LIVE CORE INTERFACE INLINE MOUNT */}
            <div className="pt-2">
                {activeTab === "workspace" ? (
                    <OrganizationProfile
                        routing="hash"
                        appearance={sharedClerkAppearance}
                    />
                ) : (
                    <UserProfile
                        routing="hash"
                        appearance={sharedClerkAppearance}
                    />
                )}
            </div>
        </div>
    );
}

// Default export wrapped safely inside an architecture fallback boundary
export default function SettingsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground animate-pulse py-6">
                <span>MOUNTING_CONTROL_DECK...</span>
            </div>
        }>
            <SettingsControlDeck />
        </Suspense>
    );
}
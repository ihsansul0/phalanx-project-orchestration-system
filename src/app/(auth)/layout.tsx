import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Centers the Clerk authentication cards dynamically on any viewport scale
        <div className="flex min-h-screen w-screen items-center justify-center bg-background text-foreground antialiased p-4">
            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
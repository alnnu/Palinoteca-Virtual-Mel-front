"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
	readonly children: ReactNode;
	readonly session: Session;
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}

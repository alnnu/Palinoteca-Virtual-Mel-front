"use client";
import { signOut, useSession } from "next-auth/react";

// import { getServerSession } from "next-auth";

function Dashboard() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (!session?.access) {
		return <p>You are not authenticated.</p>;
	}

	// const session = getServerSession();
	// console.log("session", session);

	return (
		<>
			<h1>Welcome, {session.user.email}!</h1>
			<p>Access Token: {session.access}</p>
			<p>Refresh Token: {session.refreshToken}</p>
			<div>
				<p>Your session has expired. Please sign in again.</p>
				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		</>
	);
}

export default Dashboard;

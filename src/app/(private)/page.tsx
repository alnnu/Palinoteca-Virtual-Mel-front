"use client";
import { signOut, useSession } from "next-auth/react";
// server side
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"
// import { getServerSession } from "next-auth"

function Dashboard() {
  const { data: session, status } = useSession();
  // const session = await getServerSession(authOptions) // or directly if defined in route handler
  // const token = session?.access

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session?.access) {
    return <p>You are not authenticated.</p>;
  }


  return (
    <>
      <h1>Welcome, {session.user.email}!</h1>
      <p>Access Token: {session.access}</p>
      <p>Refresh Token: {session.refreshToken}</p>
      <div>
        <p>Your session has expired. Please sign in again.</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
    </>
  );
}

export default Dashboard;

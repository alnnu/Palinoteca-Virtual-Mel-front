
// import { auth } from "@/auth";

import LoginForm from "@/components/Login/form";

async function LoginPage() {
	// const session = await auth();

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 py-12 sm:px-6 lg:px-8">
			{/* <pre>{JSON.stringify(session)}</pre> */}

			<LoginForm />
		</main>
	);
}

export default LoginPage;
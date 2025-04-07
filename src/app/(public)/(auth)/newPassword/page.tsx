import NewPasswordForm from "@/components/Reset/newPasswordForm";

function ResetPassword() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 py-12 sm:px-6 lg:px-8">
			<NewPasswordForm />
		</main>
	);
}

export default ResetPassword;

"use server";

import { signIn } from "next-auth/react";


export default async function useLogin(_prevState: unknown, formdata: FormData) {
	try {
		await signIn("credentials", {
			email: formdata.get("email") as string,
			senha: formdata.get("password") as string,
			redirect: true,
			redirectTo: "/dashboard",
		});
	} catch (error: unknown) {
		if ((error as { type?: string }).type === "CredentialsSignin") {
			return { success: false, error: "Usuário ou senha inválidos" };
		}
		return { success: false, error: "Erro inesperado" };
	}
}
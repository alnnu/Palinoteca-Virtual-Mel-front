"use client";
import { useState } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const [form] = Form.useForm();

	const { data: session, status } = useSession();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (!session) {
		return <p>You are not authenticated.</p>;
	}

	const onFinish = async (values: { email: string; password: string }) => {
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email: values.email,
				password: values.password,
				callbackUrl: "/dashboard",
			});
			if (result?.error) {
				// setError(result.error);
			} else {
				router.push("/dashboard");
			}
		} catch (error) {
			console.log("[LOGIN_ERROR]", error);
		}
	};

	return (
		<>
			{/* {state?.error && <p className="text-red-500">{state.error}</p>} */}
			<Form
				layout="vertical"
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 24 }}
				initialValues={{ remember: true }}
				autoComplete="on"
				onFinish={onFinish}
				form={form}
			>
				<Row gutter={24}>
					<Col span={12}>
						<Card
							className="max-w-sm md:w-[480px] rounded-2xl"
							title="Login"
						>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: "Email obrigatório",
									},
								]}
							>
								<Input
									type="email"
									placeholder="Endereço de Email"
								/>
							</Form.Item>
							<Form.Item
								label="Senha"
								name="password"
								rules={[
									{
										required: true,
										message: "Senha obrigatória",
									},
								]}
							>
								<Input
									placeholder="Senha"
									type={showPassword ? "text" : "password"}
								/>
							</Form.Item>

							<div className="flex my-4 items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember_me"
										name="remember_me"
										type="checkbox"
										onClick={() =>
											setShowPassword(!showPassword)
										}
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<label
										htmlFor="remember_me"
										className="ml-2 block text-sm text-gray-900"
									>
										Mostrar senha
									</label>
								</div>
							</div>
							<div>
								<Link
									href={"/register"}
									className="flex my-4 items-center justify-between"
								>
									Criar uma conta
								</Link>
							</div>
							<div>
								<Form.Item>
									<Button
										onClick={() => form.submit()}
										htmlType="submit"
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Login
									</Button>
								</Form.Item>
							</div>
						</Card>
					</Col>
				</Row>
			</Form>
		</>
	);
}

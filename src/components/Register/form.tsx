"use client";
import { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "@/lib/axios";

function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const [form] = Form.useForm();

	const onFinish = async (values: {
		email: string;
		password: string;
		passwordConfirm: string;
		name: string;
	}) => {
		try {
			const result = await apiClient.post("/create", {
				name: values.name,
				email: values.email,
				password: values.password,
				passwordConfirm: values.passwordConfirm,
			});
			if (result.status !== 201) {
				// setError(result.data.error);
			} else {
				router.push("/dashboard"); // Redirect to dashboard after successful login
			}
		} catch (error) {
			console.log("[LOGIN_ERROR]", error);
		}
	};

	return (
		<Form
			layout="vertical"
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
						title="Registrar"
					>
						<Form.Item
							label="Nome"
							name="name"
							rules={[
								{
									required: true,
									message: "Nome obrigatório",
								},
							]}
						>
							<Input placeholder="Nome do usuário" />
						</Form.Item>
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
						<Form.Item
							label="Confirmar Senha"
							name="passwordConfirm"
							rules={[
								{
									required: true,
									message: "Senha obrigatória",
								},
							]}
						>
							<Input
								placeholder="Confirmar senha"
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
						<Space style={{ width: "100%" }} size="middle">
							<Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								<Link href="/login">Voltar</Link>
							</Button>

							<Button
								onClick={() => form.submit()}
								htmlType="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Criar conta
							</Button>
						</Space>
					</Card>
				</Col>
			</Row>
		</Form>
	);
}

export default RegisterForm;

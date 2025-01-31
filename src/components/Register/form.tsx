"use client";
import { Button, Card, Col, Flex, Form, Input, Row } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "@/lib/axios";

function RegisterForm() {
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
							<Input.Password placeholder="Senha" />
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
							<Input.Password placeholder="Confirmar senha" />
						</Form.Item>
						<Flex gap={10}>
							<Link href="/login" className="w-full">
								<Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Voltar
								</Button>
							</Link>

							<Button
								// onClick={() => form.submit()}
								htmlType="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Criar conta
							</Button>
						</Flex>
					</Card>
				</Col>
			</Row>
		</Form>
	);
}

export default RegisterForm;

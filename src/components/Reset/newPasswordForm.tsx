"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, Col, Flex, Form, Input, Row } from "antd";
import apiClient from "@/lib/axios";

export default function NewPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams()
	const [form] = Form.useForm();

	const token = searchParams.get('token')

	if(!token) {
		router.push("/login")
	}

	const onFinish = async (values: { newPassword: string, newPasswordConfirm: string }) => {
		try {
				const result = await apiClient.post(`/auth/resetPassword/${token}`, {
					newPassword: values.newPassword,
					newPasswordConfirm: values.newPasswordConfirm,
				});
				if (result.status !== 200) {
					// setError("An error occurred");
				} else {
					router.push("/login");
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
							title="Redefinição de senha!"
						>
							<h3 className="text-gray-700">
								Informe uma nova senha para sua conta.
							</h3>
							<Form.Item
								label="Senha"
								name="newPassword"
								rules={[
									{
										required: true,
										message: "senha é obrigatório",
									},
								]}
							>
								<Input.Password
									placeholder="senha"
								/>
							</Form.Item>
							<Form.Item
								label="Senha para confirmar"
								name="newPasswordConfirm"
								rules={[
									{
										required: true,
										message: "senha para confirmar é obrigatório",
									},
								]}
							>
								<Input.Password
									placeholder="repita sua senha"
								/>
							</Form.Item>
							<Flex gap={10}>
								<Link href="/login" className="w-full">
									<Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Voltar
									</Button>
								</Link>

								<Button
									htmlType="submit"
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Enviar senha
								</Button>
							</Flex>
						</Card>
					</Col>
				</Row>
			</Form>
		</>
	);
}

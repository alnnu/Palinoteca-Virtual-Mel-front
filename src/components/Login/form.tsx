"use client";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm();

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
                id="email"
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
                  autoComplete="email"
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

              <div>
                <Link
                  href={"/resetPassword"}
                  className="flex my-4 items-center justify-between"
                >
                  Esqueci minha senha
                </Link>
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
                    className="group relative w-full flex justify-center py-2 px-4
                    border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

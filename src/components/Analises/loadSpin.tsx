import { Flex, Spin } from "antd";

export default function LoadSpin() {
  return (
    <Flex vertical={true} justify={"center"} align={"center"} gap={45} className="w-full">
      <div className="text-2xl">Sua imagem esta sendo analisada</div>
      <Spin size="large" />
    </Flex>
  )
}

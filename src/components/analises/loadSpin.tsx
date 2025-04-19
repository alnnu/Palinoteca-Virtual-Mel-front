import {Flex, Spin} from "antd";

export default function LoadSpin() {
    return (
            <Flex vertical={true} justify={"center"} align={"center"} gap={35} className="w-full ">
                <div>Sua imagem esta sendo analisada</div>
                <Spin size="large" />
            </Flex>
    )
}
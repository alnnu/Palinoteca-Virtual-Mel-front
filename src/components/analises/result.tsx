import {useSteps} from "@/context/stepContex";
import { Flex, Typography} from "antd";

function Result() {
    const { img } = useSteps()

    console.log(img)

    const imageURL= `${process.env.NEXT_PUBLIC_BACKEND_MEDIA_URL_DEV}/${img.image}`



    return (
        <Flex justify="space-between" gap="large" align={"center"}>
            <img
                alt="foto enviada"
                src={imageURL}
                className="h-fit w-1/2"
            />
            <Flex vertical align="center" gap="large" className="pt-2 pl-10 h-full w-1/2">
                <div className="text-6xl font-bold">
                    {img.scenario.plant}
                </div>
                <div className="text-3xl text-justify">
                    {img.scenario.description}
                </div>
            </Flex>
        </Flex>
    )
}

export default Result

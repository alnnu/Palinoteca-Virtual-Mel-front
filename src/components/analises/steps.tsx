import {useSteps} from "@/context/stepContex";
import {Steps} from "antd";

export default function AnalisesSteps() {
    const { steps } = useSteps();

    return (
        <Steps items={steps}/>
    )
}
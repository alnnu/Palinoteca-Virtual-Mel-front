import { useSteps } from "@/context/stepContext";
import { Steps } from "antd";

export default function AnalisesSteps() {
  const { steps } = useSteps();

  return (
    <Steps items={steps} className="mb-12" />
  )
}

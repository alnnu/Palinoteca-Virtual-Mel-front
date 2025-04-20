import { useSteps } from "@/context/stepContext";
import { Col, Row, Steps } from "antd";

export default function AnalisesSteps() {
  const { steps } = useSteps();

  return (
    <Row className="mb-12" gutter={[16, 16]} justify="center">
      <Col xs={{ span: 26 }} xl={{ span: 6 }}>
        <Steps items={steps} className="mb-12" />
      </Col>
    </Row>
  )
}

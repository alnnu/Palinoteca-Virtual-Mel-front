import { fetchDataServer } from "@/hooks/useFetch";
import apiClient from "@/lib/axios";
import { Scenario } from "@/types/Images";
import { Col, Row } from "antd";
import Card from "antd/es/card/Card";

const Polem = async () => {
  const data = await fetchDataServer(() =>
    apiClient.get('/app/image/scenario/all')
  );

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]} justify="center">
        {data?.results.map((scenario: Scenario) => (
          <Col
            key={scenario.id}
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              hoverable
              style={{ width: '100%', maxWidth: 350 }}
              title={scenario.plant}
            >
              <p>{scenario.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Polem;


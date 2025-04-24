import { fetchDataServer, } from "@/hooks/useFetch";
import apiClient from "@/lib/axios";
import { Scenario } from "@/types/Images";

const Polem = async () => {

  const data = await fetchDataServer(() =>
    apiClient.get('/app/image/scenario/all')
  )

  console.log('data', data)
  return (
    <>
      {data?.results.map((scenario: Scenario) => (
        <div key={scenario.id}>
          <h2>{scenario.plant}</h2>
          <p>{scenario.description}</p>
        </div>
      ))}
    </>
  );
}


export default Polem;

import { StepsProvider } from "@/context/stepContext";
import AnalisesForm from "@/components/Analises/form";

function NovaAnalises() {
  return (
    <StepsProvider>
      <AnalisesForm />
    </StepsProvider>
  );
}


export default NovaAnalises;

import {StepsProvider} from "@/context/stepContex";
import AnalisesForm from "@/components/analises/form";


function NovaAnalises() {


    return (
        <StepsProvider>
            <AnalisesForm />
        </StepsProvider>
    );
}


export default NovaAnalises;
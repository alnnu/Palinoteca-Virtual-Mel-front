'use client'
import {createContext, ReactNode, useContext, useState} from "react";
import {StepProps} from "antd";

const StepContext = createContext<any>([])

export const StepsProvider = ({ children }: { children: ReactNode }) => {
    const [steps, setSteps] = useState<StepProps[]>([
        {
            title: 'envio de foto',
            status: 'process',
        },
        {
            title: 'Verificação',
            status: 'wait',
        },
        {
            title: 'Resultado',
            status: 'wait',
        },
    ]);

    const [CurrStep, setCurrStep] = useState(0);

    return (
        <>
            <StepContext.Provider value={{steps, setSteps, CurrStep, setCurrStep}}>
                {children}
            </StepContext.Provider>
        </>
    )
}

export const useSteps = (): any=> {
    const context = useContext(StepContext);
    if (!context) {
        throw new Error('useSteps deve ser usado dentro de StepsProvider');
    }
    return context;
};
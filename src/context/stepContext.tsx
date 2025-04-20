'use client'
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { StepProps } from "antd";
import { ReturnImage, StepContextType } from "@/types/Images";

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<StepProps[]>([
    { title: 'Enviar foto', status: 'process' },
    { title: 'Verificação', status: 'wait' },
    { title: 'Resultado', status: 'wait' },
  ]);

  const [currStep, setCurrStep] = useState(0);
  const [img, setImg] = useState<ReturnImage | null>(null);

  const contextValue = useMemo(() => ({
    steps, setSteps, currStep, setCurrStep, img, setImg
  }), [steps, currStep, img]);

  return (
    <StepContext.Provider value={contextValue}>
      {children}
    </StepContext.Provider>
  );
};

export const useSteps = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useSteps deve ser usado dentro de StepsProvider');
  }
  return context;
};

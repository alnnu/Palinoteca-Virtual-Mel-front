import { StepProps } from 'antd';

export type Scenario = {
  id: string;
  plant: string;
  description: string;
};

export type ReturnImage = {
  id: string;
  image: string;
  scenario: Scenario;
};

export type StepContextType = {
  steps: StepProps[];
  setSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
  currStep: number;
  setCurrStep: React.Dispatch<React.SetStateAction<number>>;
  img: ReturnImage | null;
  setImg: React.Dispatch<React.SetStateAction<ReturnImage | null>>;
};


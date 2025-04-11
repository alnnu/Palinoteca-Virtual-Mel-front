"use client"
import {StepProps, Steps} from 'antd';
import {useState} from "react";
import UploadOneForm from "@/components/photos/uploadOneForm";
import {useSession} from "next-auth/react";

function NovaAnalises() {
    const { data: session, status } = useSession();

    const [CurrStep, setCurrStep] = useState(0);
    if (status === "loading") {
        return <p>Loading...</p>;

    }

    const steps: StepProps[] = [
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
    ];
    return (
        <>
            <Steps items={steps}/>
            {
                CurrStep == 0 ? <UploadOneForm user={session ? session.user.id: ""}/>: <></>
            }
        </>
    );
}

export default NovaAnalises;

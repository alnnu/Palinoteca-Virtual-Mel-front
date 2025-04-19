'use client'
import {useSteps} from "@/context/stepContex";
import AnalisesSteps from "@/components/analises/steps";
import UploadOneForm from "@/components/photos/uploadOneForm";
import {useSession} from "next-auth/react";
import LoadSpin from "@/components/analises/loadSpin";
import Result from "@/components/analises/result";
import {Card, Flex} from "antd";

export default function AnalisesForm() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    const { CurrStep } = useSteps();
    return (
        <div className="p-16">
            <AnalisesSteps/>
            {
                CurrStep == 0 ? <UploadOneForm user={session ? session.user.id : ''} />:
                    CurrStep == 1 ? <LoadSpin/> : <Result/>
            }
        </div>

    )
}
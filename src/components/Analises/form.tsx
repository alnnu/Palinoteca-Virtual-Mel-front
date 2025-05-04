'use client'
import { useSteps } from "@/context/stepContext";
import AnalisesSteps from "@/components/Analises/steps";
import UploadOneForm from "@/components/Photos/uploadOneForm";
import { useSession } from "next-auth/react";
import LoadSpin from "@/components/Analises/loadSpin";
import Result from "@/components/Analises/result";
import { message } from "antd";

export default function AnalisesForm() {
  const { data: session, status } = useSession();
  const { currStep } = useSteps();
  const [messageApi, contextHolder] = message.useMessage();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-16">
      {contextHolder}
      <AnalisesSteps />
      {
        currStep == 0 ? <UploadOneForm messageApi={messageApi} user={session ? session.user.id : ''} /> : null
      }
      {
        currStep == 1 ? <LoadSpin /> : <Result />
      }
    </div>
  );
}


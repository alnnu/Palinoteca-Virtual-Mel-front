'use client'
import { useSteps } from "@/context/stepContext";
import AnalisesSteps from "@/components/Analises/steps";
import UploadOneForm from "@/components/Photos/uploadOneForm";
import { useSession } from "next-auth/react";
import LoadSpin from "@/components/Analises/loadSpin";
import Result from "@/components/Analises/result";

export default function AnalisesForm() {
  const { data: session, status } = useSession();
  const { currStep } = useSteps();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-16">
      <AnalisesSteps />
      {
        currStep == 0 ? <UploadOneForm user={session ? session.user.id : ''} /> : null
      }
      {
        currStep == 1 ? <LoadSpin /> : <Result />
      }
    </div>
  );
}


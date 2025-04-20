"use client"
import { Button, GetProp, Upload, UploadProps, Image } from "antd";
import { useState } from "react";
import apiClient from "@/lib/axios";
import { useSteps } from "@/context/stepContext";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function UploadOneForm({ user }: { user: string }) {
  const { setSteps, setCurrStep, setImg } = useSteps()

  const [file, setFile] = useState<any>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onAdd = async (image: any) => {
    setFile(image.file);

    if (!image.url && !image.preview) {
      image.preview = await getBase64(image.file as FileType);
    }
    setPreviewImage(image.url || (image.preview as string));
    setPreviewOpen(true);
  }
  const onRemove = () => {
    setFile(null);
  }
  const onFinish = async () => {

    try {
      const fmData = new FormData();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      fmData.append("image", file);
      fmData.append("user", user);

      setSteps([
        {
          title: 'envio de foto',
          status: 'finish',
        },
        {
          title: 'Verificação',
          status: 'process',
        },
        {
          title: 'Resultado',
          status: 'wait',
        },
      ])
      setCurrStep(1)

      const result = await apiClient
        .post("/app/image/upload", fmData, config)


      if (result.status !== 201) {
        // setError(result.data.error);
      } else {
        setSteps([
          {
            title: 'envio de foto',
            status: 'finish',
          },
          {
            title: 'Verificação',
            status: 'finish',
          },
          {
            title: 'Resultado',
            status: 'finish',
          },
        ])
        setCurrStep(2)
        setImg(result.data)
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  }


  return (
    <div className="flex flex-col items-center justify-center w-full h-fit">
      <div className="h-52 w-96">
        <Upload.Dragger
          listType="picture"
          accept="image/*"
          fileList={file ? [file] : []}
          maxCount={1}
          customRequest={(e) => { onAdd(e) }}
          onRemove={onRemove}
        >
          <div className="flex justify-center flex-col ">
            <div className="mb-2">Arraste a imagem ou</div>
            <Button > clique aqui </Button>
          </div>
        </Upload.Dragger>

        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}

        <div className="flex justify-between mt-9 w-full">
          <Button
            type="primary"
            className="group relative w-5/12 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => onFinish()}
          >
            enviar
          </Button>
          <Button
            type="primary"
            className="group relative w-5/12 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => onRemove()}
          >
            reniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadOneForm;

"use client"
import { Button, GetProp, Upload, UploadProps, Image, message } from "antd";
import { useState } from "react";
import apiClient from "@/lib/axios";
import { useSteps } from "@/context/stepContext";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function UploadOneForm({ user, messageApi }: { user: string, messageApi: any }) {
  const { setSteps, setCurrStep, setImg } = useSteps()

  const [file, setFile] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');


  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Não foi possível enviar a imagem, tente novamente.',
      duration: 5,
    });
  };

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
    setPreviewImage(image.url ?? (image.preview as string));
    setPreviewOpen(true);
  }
  const onRemove = () => {
    setFile(null);
    setPreviewImage('')
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

      const result = await apiClient.post("/app/image/upload", fmData, config)

      if (result.status !== 201) {
        error()
        setCurrStep(0)
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
    } catch (msg) {
      error()
      setCurrStep(0)
      console.log("[ERROR]", msg);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit">
      <div className="h-52 w-96">
        {previewImage ? (
          <Upload
            listType="picture"
            accept="image/*"
            fileList={file ? [file] : []}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
            customRequest={(e) => onAdd(e)}
            onRemove={onRemove}
            className="w-full"
          >
            <Button type="dashed" className="mt-2 w-96">Trocar imagem</Button>
          </Upload>
        ) : (
          <Upload.Dragger
            listType="picture"
            accept="image/*"
            fileList={file ? [file] : []}
            maxCount={1}
            customRequest={(e) => onAdd(e)}
            onRemove={onRemove}
          >
            <div className="flex justify-center flex-col">
              <div className="mb-2">Arraste a imagem ou</div>
              <Button>clique aqui</Button>
            </div>
          </Upload.Dragger>
        )}

        {previewImage && (
          <div className="cursor-pointer mt-4">
            <Image
              onClick={() => setPreviewOpen(true)}
              src={previewImage}
              alt="Preview"
              width={390}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => {
                  setPreviewOpen(visible);
                },
              }}
            />
          </div>
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

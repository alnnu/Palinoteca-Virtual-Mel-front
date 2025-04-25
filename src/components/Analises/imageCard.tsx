import {ReturnImage} from "@/types/Images";
import {Card, Image} from "antd";
import Meta from "antd/es/card/Meta";

export default function ImageCard({file}: {file: ReturnImage}) {
    return (
        <Card
            hoverable
            style={{ width: 300, height: 350 }}
            cover={
            <Image
                alt="card image"
                src={`${process.env.NEXT_PUBLIC_BACKEND_MEDIA_URL_DEV}${file.image}`}
                width={300}
                height={300}
            />}
        >
            <Meta title={file.scenario.plant} />
        </Card>
    )
}
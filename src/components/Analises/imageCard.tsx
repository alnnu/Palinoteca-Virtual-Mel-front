import {ReturnImage} from "@/types/Images";
import {Card} from "antd";
import Meta from "antd/es/card/Meta";

export default function ImageCard({file}: {file: ReturnImage}) {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={`${process.env.NEXT_PUBLIC_BACKEND_MEDIA_URL_DEV}${file.image}`} />}
        >
            <Meta title={file.scenario.plant} />
        </Card>
    )
}
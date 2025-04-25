"use client"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {ImagePage} from "@/types/Images";
import ImageCard from "@/components/Analises/imageCard";
import {Col, Row} from "antd";
import {fetchDataServer} from "@/hooks/useFetch";
import apiClient from "@/lib/axios";

function Analises() {
    const { data: session, status } = useSession();

    const [images, setImages] = useState<ImagePage>()

    const getImages = async (id: string | undefined) => {

        return await fetchDataServer(() =>
            apiClient.get(`/app/image/${id}/all`)
        )
    }

    useEffect(() => {
        if(session) {
            getImages(session?.user.id).then((res) => setImages(res))
        }
    }, [setImages, session]);

    if (status === "loading") {
        return <p>Loading...</p>;

    }
    if (!session?.access) {
        return <p>You are not authenticated.</p>;

    }

    console.log(images)
    return (
        <div>
            <Row
                align="middle"
                justify="center"
            >
                {
                    images?.results.map((file, i) => (
                        <Col
                            key={i}
                        >
                            <ImageCard file={file}/>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

export default Analises;

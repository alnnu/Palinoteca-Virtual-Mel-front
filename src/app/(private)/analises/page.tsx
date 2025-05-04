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
            apiClient.get(`/app/image/images/${id}/all`)
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
        <div style={{ padding: 24 }}>
            <Row gutter={[16, 16]} justify="center">
                {
                    images?.results.map((file, i) => (
                        <Col
                            key={file.id}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={6}
                            style={{ display: 'flex', justifyContent: 'center' }}
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

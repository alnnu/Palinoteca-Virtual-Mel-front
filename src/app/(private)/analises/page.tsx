"use client"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {ImagePage} from "@/types/Images";
import axios from "@/lib/axios";
import ImageCard from "@/components/Analises/imageCard";

function Analises() {
    const { data: session, status } = useSession();

    const [images, setImages] = useState<ImagePage>()

    useEffect(() => {
        if(session) {
            getImages(session?.user.id)
        }
    }, []);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session?.access) {
        return <p>You are not authenticated.</p>;
    }

    const getImages = async (id: string) => {
        try {
            const result = await axios.get(`/app/image/${id}/all`)

            if (result.status == 200) {
                setImages(result.data)
            }else {
                console.log("[ERROR]", result.data);
            }

        } catch (msg) {
            console.log("[ERROR]", msg);
        }

    }

    console.log(`${process.env.NEXT_PUBLIC_BACKEND_MEDIA_URL_DEV}${images?.results[0].image}`)
    return (
        <div>
            {
                images?.results.map((file, i) => (
                    <ImageCard key={i} file={file}/>
                ))
            }
        </div>
    );
}

export default Analises;

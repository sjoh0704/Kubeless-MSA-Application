import { useState } from "react";
import '../assets/css/ImageUpload.css'
import { S3Config, UploadS3 } from "./UploadS3";
import axios from 'axios'

const UploadImage = () => {
    const [state, setState] = useState(null);
    console.log(state);

    const onSubmit =(event)=>{
        const body = {
            imageURL: `https://${S3Config.bucketName}.s3.${S3Config.region}.amazonaws.com/${state.name}` 
        };
        console.log(body)


        UploadS3([state]);

        axios
            .post("", body)
            .then((response) => {
                alert("성공")
            })
            .catch((e) => {
                alert("실패")
            });
    }

    return (
        <div>
            <input type="file" class="custom-file-input" id="input" accept="image/*" onChange={(event) => setState(event.target.files[0])} value="" />

            {state && <button onClick={(event) => setState(null)}>Remove Image</button>}
            {state && <img id="output" style={{ width: "50%" }} src={URL.createObjectURL(state)} />}
            {state && <button onClick={(event) => onSubmit(event)}>제출하기</button>}
        </div>
    );
};

export default UploadImage;

import { useState } from "react";
import '../assets/css/ImageUpload.css'
const UploadImage = () => {
    const [state, setState] = useState(null);
    console.log(state);

    const onSubmit =(event)=>{
        console.log("클릭")
    }

    return (
        <div>
            <input type="file" class="custom-file-input" id="input" accept="image/*" onChange={(event) => setState(URL.createObjectURL(event.target.files[0]))} value="" />

            {state && <button onClick={(event) => setState(null)}>Remove Image</button>}
            <img id="output" style={{ width: "50%" }} src={state} />
            {state && <button onClick={(event) => onSubmit(event)}>제출하기</button>}
        </div>
    );
};

export default UploadImage;

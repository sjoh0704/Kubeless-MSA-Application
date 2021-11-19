import { useState } from "react";
import "../assets/css/ImageUpload.css";
import { S3Config, UploadS3 } from "./UploadS3";
import axios from "axios";
import sha256 from "sha256";
import { Container,Row, Col } from "react-bootstrap";

const UploadImage = () => {
    const [contents, setContents] = useState({
        a: 0,
        b: 0,
    });
    const [hash, setHash] = useState(null);
    const [state, setState] = useState(null);
    console.log(state);

    const onSubmit = (event) => {
        let hashed = sha256(state.name);
        const body = {
            userId: hashed,
            imageUrl: `https://${S3Config.bucketName}.s3.${S3Config.region}.amazonaws.com/${state.name}`,
        };
        console.log(body);

        UploadS3([state]);

        axios
            .post("/producer", body)
            .then((response) => {
                setHash(hashed);
                alert("성공");
            })
            .catch((e) => {
                setHash(null);
                alert("실패");
            });
    };
    const onRemove = (event) => {
        setState(null);
        setHash(null);
        setContents({
            a: 0,
            b: 0,
        });
    };

    const onResult = (event) => {
        axios
            .get(`/api/v1/info/${hash}`)
            // .get(`/api/v1/info/11`)
            .then((response) => {
                alert("성공");

                console.log(response);
                let payload = response.data.payload;
                setContents({ a: payload.a, b: payload.b });
            })
            .catch((e) => {
                alert("다시 시도해주세요");
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                
                </Col>
                </Row>
            <div>
                {/* <input type="file" class="file-upload-input" id="input" accept="image/*" onChange={(event) => setState(event.target.files[0])} value="" /> */}

                <input
                    type="file"
                    style={{}}
                    id="input"
                    accept="image/*"
                    onChange={(event) => setState(event.target.files[0])}
                    value=""
                />

                {state && (
                    <button onClick={(event) => onRemove(event)}>
                        Remove Image
                    </button>
                )}
                {state && (
                    <img
                        id="output"
                        style={{ width: "50%" }}
                        src={URL.createObjectURL(state)}
                    />
                )}
                {state && (
                    <button onClick={(event) => onSubmit(event)}>
                        제출하기
                    </button>
                )}
                {hash && (
                    <button onClick={(event) => onResult(event)}>
                        결과 확인하기
                    </button>
                )}
                {hash && (
                    <div>
                        <p>a: {contents.a}</p>
                        <p>b: {contents.b}</p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default UploadImage;

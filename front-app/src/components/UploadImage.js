import { useState } from "react";
import "../assets/css/ImageUpload.css";
import { S3Config, UploadS3 } from "./UploadS3";
import axios from "axios";
import sha256 from "sha256";
import { Container, Row, Col } from "react-bootstrap";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const UploadImage = () => {
    let find = false;
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState(null);
    const [hash, setHash] = useState(null);
    const [state, setState] = useState(null);

    const onSubmit = (event) => {
        find = false;
        let hashed = sha256(state.name);
        const body = {
            userId: hashed,
            imageUrl: `https://${S3Config.bucketName}.s3.${S3Config.region}.amazonaws.com/${state.name}`,
        };
        console.log(body);

        UploadS3([state]);
        setLoading(true);

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

    const checkFileSize = (file) => {
        console.log(file);
        console.log(file.lastModified);
        console.log(file.size);
        if (file.size < 224 * 224) {
            alert("파일 사이즈가 너무 작아요");
            return false;
        }

        return file;
    };

    const onResult = async (event) => {
        find = false;
        const _sleep = (delay) =>
            new Promise((resolve) => setTimeout(resolve, delay));

        for (let i = 0; i < 5; i++) {
            if (!find) {
                console.log("반복");
                await _sleep(1000);
                axios
                    .get(`/api/v1/info/${hash}`)
                    // .get(`/api/v1/info/11`)
                    .then((response) => {
                        find = true;
                        alert("성공");
                        console.log(response);
                        let payload = response.data.payload;
                        setContents({ dog: payload.dog, cat: payload.cat });
                        setLoading(false);
                    })
                    .catch((e) => {
                        console.log(e);
                        // setContents({ dog: 0.9, cat: 0.1 });
                        // setLoading(false);
                    });
            } else {
                break;
            }
        }
        setLoading(false);
        if(!find){
            alert("Error: 관리자에게 문의하세요 ")

        }
    };

    const onClickHandler = (event) => {
        find = false;
        setState(null);
        setHash(null);
        setContents(null);
        setLoading(false);
        let checkedFile = checkFileSize(event.target.files[0]);
        if (checkedFile) setState(checkedFile);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div></div>
                </Col>
            </Row>

            <div class="filebox">
                <label for="ex_file">
                    {state ? "다른 사진으로 할래요?" : "사진을 업로드하세요"}
                </label>
                <input
                    type="file"
                    id="ex_file"
                    accept="image/*"
                    onChange={onClickHandler}
                    value=""
                />
            </div>
            <br />

            <div>
                {state && (
                    <img
                        id="output"
                        style={{ width: "100%" }}
                        src={URL.createObjectURL(state)}
                    />
                )}
                <br />
                {state && (
                    <div
                        class="filebox"
                        onClick={(event) => {
                            onSubmit(event);
                            onResult(event);
                        }}
                    >
                        <label>결과 확인하기</label>
                    </div>
                )}
                <br />
                {state && (
                    <div>
                        {contents ? (
                            <div>
                                <p>개 상: {contents.dog}</p>
                                <p>고양이 상: {contents.cat}</p>
                            </div>
                        ) : (
                            <div>
                                <ClockLoader
                                    color={"#555555"}
                                    loading={loading}
                                    css={override}
                                    size={60}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default UploadImage;

import { useState } from "react";
import "../assets/css/ImageUpload.css";
import { S3Config, UploadS3 } from "./UploadS3";
import axios from "axios";
import sha256 from "sha256";
import { Container, Row, Col, Button } from "react-bootstrap";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import Result from "./Result";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const UploadImage = () => {
    const [gender, setGender] = useState(0);
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState(null);
    const [hash, setHash] = useState(null);
    const [state, setState] = useState(null);

    const onSubmit = (event) => {
        let hashed = gender + sha256(state.name);
        console.log("hashed", hashed);
        const body = {
            userId: hashed,
            imageUrl: `https://${S3Config.bucketName}.s3.${S3Config.region}.amazonaws.com/${state.name}`,
        };
        console.log(body);

        UploadS3([state]);
        setLoading(true);
        setHash(hashed);
        axios
            .post("/producer", body)
            .then((response) => {
                alert("업로드 성공");
            })
            .catch((e) => {
                setHash(null);
                alert("업로드 실패");
            });
        return hashed;
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

    const onResult = async (event, hash) => {
        let find = false;
        const _sleep = (delay) =>
            new Promise((resolve) => setTimeout(resolve, delay));

        for (let i = 0; i < 10; i++) {
            if (!find) {
                console.log("반복");
                await _sleep(1000);
                axios
                    .get(`/api/v1/info/${hash}`)
                    // .get(`/api/v1/info/11`)
                    .then((response) => {
                        find = true;
                        console.log(response);
                        let payload = response.data.payload;

                        setContents(<Result payload={payload} />);

                        setLoading(false);
                    });
            }
            if (find) {
                break;
            }
        }
        setLoading(false);
        if (!find) {
            alert("Error: 관리자에게 문의하세요 ");
        } else {
            alert("결과를 확인하세요!");
        }
    };

    const onClickHandler = (event) => {
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
                <Col md={{ span: 2, offset: 4 }}>
                    <div className="d-grid gap-2">
                        <Button
                            style={{ padding: 8, fontSize: "1.2rem" }}
                            onClick={() => setGender(0)}
                            variant="primary"
                        >
                            남자
                        </Button>
                    </div>
                </Col>
                <Col md={{ span: 2, offset: 0 }}>
                    <div className="d-grid gap-2">
                        <Button
                            onClick={() => setGender(1)}
                            variant="primary"
                            style={{ padding: 8, fontSize: "1.2rem" }}
                        >
                            여자
                        </Button>
                    </div>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <div className="d-grid gap-2">
                        <div class="filebox">
                            <label
                                for="ex_file"
                                style={{
                                    fontSize: "1.2rem",
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                {state
                                    ? "다른 사진으로 할래요"
                                    : "사진을 업로드하세요"}
                            </label>
                            <input
                                type="file"
                                id="ex_file"
                                accept="image/*"
                                onChange={onClickHandler}
                                value=""
                            />
                        </div>
                    </div>
                </Col>
            </Row>

            <br />
            <Row>
                <Col lg={{ span: 4, offset: 4 }}>
                    {state ? (
                        <img
                            id="output"
                            style={{
                                width: "100%",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                            src={URL.createObjectURL(state)}
                        />
                    ) : (
                        <div style={{ height: 400 }}></div>
                    )}
                </Col>
            </Row>

            <br />

            <Row>
                <Col lg={{ span: 4, offset: 4 }}>
                    {state && (
                        <div className="d-grid gap-2">
                            <Button
                                style={{ fontSize: "1.2rem" }}
                                onClick={(event) => {
                                    let flag = onSubmit(event);
                                    // console.log(flag);
                                    // setContents(
                                    //     <Result
                                    //         payload={{
                                    //             cat: 0.1,
                                    //             dog: 0.2,
                                    //             rabbit: 0.3,
                                    //             bear: 0.4,
                                    //             dino: 0.1123412,
                                    //             fox: 0.3,
                                    //         }}
                                    //     />
                                    // );

                                    if (flag) onResult(event, flag);
                                    // if (flag) onResult(event, flag);
                                }}
                            >
                                결과 확인하기
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>

            <br />

            {/* {hash && ( */}
            {hash && (
                <div style={{ marginTop: 50 }}>
                    {contents ? (
                        <div>{contents}</div>
                    ) : (
                        <Row>
                            <Col lg={{ span: 6, offset: 5 }}>
                                <PulseLoader
                                    color={"#555555"}
                                    loading={loading}
                                    css={override}
                                    size={60}
                                />
                            </Col>
                        </Row>
                    )}
                </div>
            )}

            <div style={{ marginTop: 200 }}></div>
        </Container>
    );
};

export default UploadImage;

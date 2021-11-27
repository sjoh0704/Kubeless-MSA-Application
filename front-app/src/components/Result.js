import { Col, Row, ProgressBar } from "react-bootstrap";
const Result = ({ payload }) => {
    const { dog, cat, dino, rabbit, bear, fox } = payload;
    return (
        <div>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        고양이상
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        style={{
                            height: "1.5rem",
                        }}
                        now={cat * 100}
                        label={`${cat * 100}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        강아지상
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        style={{
                            height: "1.5rem",
                        }}
                        now={dog * 100}
                        label={`${dog * 100}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        곰상
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        style={{
                            height: "1.5rem",
                        }}
                        now={bear * 100}
                        label={`${bear * 100}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        공룡상
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        style={{
                            height: "1.5rem",
                        }}
                        now={dino * 100}
                        label={`${dino * 100}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        여우상
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        style={{
                            height: "1.5rem",
                        }}
                        now={fox * 100}
                        label={`${fox * 100}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        토끼상
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        style={{
                            height: "1.5rem",
                        }}
                        now={rabbit * 100}
                        label={`${rabbit * 100}%`}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Result;

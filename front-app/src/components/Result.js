import { Col, Row, ProgressBar } from "react-bootstrap";

const Result = ({ payload }) => {
    const { dog, cat, dino, rabbit, bear, fox } = payload;
    return (
        <div>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        고양이
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        variant="info"
                        style={{
                            height: "2rem",
                        }}
                        now={Math.round(cat * 100)}
                        label={`${Math.round(cat * 100)}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        강아지
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        variant="success"
                        style={{
                            height: "2rem",
                        }}
                        now={Math.round(dog * 100)}
                        label={`${Math.round(dog * 100)}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        곰
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        style={{
                            height: "2rem",
                        }}
                        now={Math.round(bear * 100)}
                        label={`${Math.round(bear * 100)}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        공룡
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        variant="danger"
                        style={{
                            height: "2rem",
                        }}
                        now={Math.round(dino * 100)}
                        label={`${Math.round(dino * 100)}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        여우
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        variant="warning"
                        style={{
                            height: "2rem",
                        }}
                        now={Math.round(fox * 100)}
                        label={`${Math.round(fox * 100)}%`}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: 1, offset: 2 }}>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        토끼
                    </p>
                </Col>

                <Col lg={{ span: 6, offset: 0 }}>
                    <ProgressBar
                        variant="info"
                        style={{
                            height: "2rem",
                        }}
                        now={Math.round(rabbit * 100)}
                        label={`${Math.round(rabbit * 100)}%`}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Result;

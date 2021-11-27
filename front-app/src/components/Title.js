import { Container, Row, Col } from "react-bootstrap";
const Title = () => {
    return (
        <div
            style={{
                backgroundColor: "#555555",
                color: "white",
                width: "100vw",
                paddingTop: 20,
                paddingBottom: 10,
            }}
        >
            <Container>
                <Row>
                    <Col
                        lg={{ span: 6, offset: 4 }}
                        md={{ span: 8, offset: 3 }}
                        sm={{ span: 8, offset: 2 }}
                    >
                        <p style={{ fontSize: "2rem" }}>
                            승주의 인공지능 동물상 테스트
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Title;

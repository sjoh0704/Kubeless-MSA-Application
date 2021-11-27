import { Container, Row, Col } from "react-bootstrap";
const Title = () => {
    return (
        <div
            style={{
                backgroundColor: "#555555",
                color: "white",
                width: "100vw",
            }}
        >
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 10 }}>
                        <p>승주의 인공지능 동물상 테스트</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default Title;

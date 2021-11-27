import Title from "./Title";
import UploadImage from "./UploadImage";
import { Container } from "react-bootstrap";

const Home = () => {
    return (
        <Container>
            <Title />
            <br />
            <UploadImage />
        </Container>
    );
};
export default Home;

import Title from "./Title";
import UploadImage from "./UploadImage";
import { Container } from "react-bootstrap";
import Footer from "./Footer";

const Home = () => {
    return (
        <div>
            <Title />
            <br />
            <UploadImage />
            <hr style={{ margin: 0 }} />
            <Footer />
        </div>
    );
};
export default Home;

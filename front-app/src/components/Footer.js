import "../assets/css/footer.css";
const Footer = () => {
    return (
        <div className="footer" style={{padding:10}}>
            <span>© Made by Seung</span>
            <span style={{ marginLeft: 20 }}>
                <a href={"https://github.com/sjoh0704"}>Seung's github</a>
            </span>
        </div>
    );
};

export default Footer;

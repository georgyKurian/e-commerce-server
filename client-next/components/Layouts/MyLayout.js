import Header from "./Header";
import Footer from "./Footer";

const linkStyle = {
  marginRight: 15
};

const MyLayout = (props) => (
  <div>
    <Header />
    <div className="content">{props.children}</div>
    <Footer />
  </div>
);

export default MyLayout;

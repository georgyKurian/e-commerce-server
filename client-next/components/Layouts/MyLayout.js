import Header from "./Header";
import Footer from "./Footer";

const linkStyle = {
  marginRight: 15
};

const MyLayout = (props) => (
  <div>
    <Header />
    <div className="content inner-wrap mt-32">{props.children}</div>
    <Footer />
  </div>
);

export default MyLayout;

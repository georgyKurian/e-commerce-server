import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const Footer = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>F1</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>F2</a>
    </Link>
  </div>
);

export default Footer;

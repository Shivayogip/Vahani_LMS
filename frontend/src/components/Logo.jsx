import { T } from "../theme";
import logo from "../assets/vahani-logo.jpeg";

const Logo = ({ width = 130 }) => (
  <img
    src={logo}
    alt="Vahani Logo"
    style={{
      width: width,
      height: "auto",
      objectFit: "contain"
    }}
  />
);

export default Logo;
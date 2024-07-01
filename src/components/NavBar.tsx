import { Link } from "react-router-dom";
import { DASHBOARD } from "../utils/constants";
import { useAuth } from "../hooks/useContext";

export const NavBar = () => {
  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={`${DASHBOARD}/about`}>About</Link>
        </li>
        <li>
          <Link to={`${DASHBOARD}/contact`}>Contact</Link>
        </li>
        <li>
          <Link to={`/auth/login`} onClick={handleSignOut}>
            SingOut
          </Link>
        </li>
      </ul>
    </nav>
  );
};

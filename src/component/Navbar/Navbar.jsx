import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("auth-token");
  const userId = jwtDecode(token)?.userId;
 
  const isAdmin = jwtDecode(token).isAdmin;

  const navigate = useNavigate();
  const logoutHandler = () => {
    console.log("hello");
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 600);

  const drawerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click target is outside the drawer
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeDrawer(); // Close the drawer if the click is outside
      }
    };

    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = () => {
    setIsOpen(false);
  };
  return (
    <nav>
      <div className="logo-container">Fav Lang</div>
      {!isWideScreen ? (
        <div className="menu-container">
          <MenuIcon onClick={() => setIsOpen((prev) => !prev)} />
        </div>
      ) : (
        <ul>
          {!isAdmin && (
            <li>
              <NavLink
                className={(isActive) =>
                  "link-tag" + (!isActive ? "unselected" : "")
                }
                to="/home"
              >
                Home
              </NavLink>
            </li>
          )}
         
          {!isAdmin && (
            <li>
              <NavLink
                className={(isActive) =>
                  "link-tag" + (!isActive ? "unselected" : "")
                }
                to="/history"
              >
                Given Test
              </NavLink>
            </li>
          )}

          {!isAdmin && (
            <li>
              <NavLink
                className={(isActive) =>
                  "link-tag" + (!isActive ? "unselected" : "")
                }
                to="/leaderboard"
              >
                LeaderBoard
              </NavLink>
            </li>
          )}
          {!isAdmin && (
            <li>
              <NavLink
                to="/profile"
                className={(isActive) =>
                  "link-tag" + (!isActive ? "unselected" : "")
                }
              >
                Profile
              </NavLink>
            </li>
          )}

          {isAdmin && (
            <li>
              <NavLink
                className={(isActive) =>
                  "link-tag" + (!isActive ? " unselected" : "")
                }
                to="/addLang"
              >
                Add Lanuage
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink
                className={(isActive) =>
                  "link-tag" + (!isActive ? " unselected" : "")
                }
                to="/addquestions"
              >
                Add Questions
              </NavLink>
            </li>
          )}
          <li onClick={logoutHandler}>
            <NavLink
              className={(isActive) =>
                "link-tag" + (!isActive ? " unselected" : "")
              }
              to="login"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      )}
      {
        <div className={`drawer ${isOpen ? "open" : ""}`}>
          <div className="drawer-content">
            <ul className={`drawer-content-nav-item ${isOpen ? "open" : ""}`}>
              {!isAdmin && (
                <li className="nav-item">
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={(isActive) =>
                      "link-tag" + (!isActive ? " unselected" : "")
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
              )}
              {!isAdmin && (
                <li className="nav-item">
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={(isActive) =>
                      "link-tag" + (!isActive ? " unselected" : "")
                    }
                    to="/history"
                  >
                    Given Test
                  </NavLink>
                </li>
              )}
              {!isAdmin && (
                <li className="nav-item">
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={(isActive) =>
                      "link-tag" + (!isActive ? " unselected" : "")
                    }
                    to="/leaderboard"
                  >
                    Leaderboard
                  </NavLink>
                </li>
              )}
              {!isAdmin && (
                <li className="nav-item">
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={(isActive) =>
                      "link-tag" + (!isActive ? " unselected" : "")
                    }
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
              )}

              {isAdmin && (
                <li>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={(isActive) =>
                      "link-tag" + (!isActive ? " unselected" : "")
                    }
                    to="/addLang"
                  >
                    Add Lanuage
                  </NavLink>
                </li>
              )}
              {isAdmin && (
                <li>
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    className={(isActive) =>
                      "link-tag" + (!isActive ? " unselected" : "")
                    }
                    to="/addquestions"
                  >
                    Add Questions
                  </NavLink>
                </li>
              )}
              {
                <li className="nav-item">
                  <NavLink
                    onClick={logoutHandler}
                    className={(isActive) =>
                      "link-tag" + (!isActive ? " unselected" : "")
                    }
                    to="/login"
                  >
                    Logout
                  </NavLink>
                </li>
              }
            </ul>
          </div>
        </div>
      }
    </nav>
  );
};

export default Navbar;

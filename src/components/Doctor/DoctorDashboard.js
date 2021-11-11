import React, { useContext, useEffect, useState } from "react";
import { store } from "../Store/store";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const DoctorDashboard = () => {
  const token = useContext(store);
  const [data, setData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (data == null)
      axios
        .get("http://localhost:5000/myprofile", {
          headers: {
            "x-token": token[0],
          },
        })
        .then((res) => {
          setData(res.data);
          console.log(data.category);
        })
        .catch((err) => console.log(err));
  });

  if (!token[0]) {
    history.push("/login");
  }

  return (
    <div className="App container">
      {data && (
        <div>
          <SideNav style={{ "background-color": "#23609e" }}>
            <SideNav.Toggle className="open" />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                <NavIcon>
                  <i className="fa fa-fw fa-home fa-2x" />
                </NavIcon>
                <NavText>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    HOME
                  </Link>
                </NavText>
              </NavItem>
              <NavItem>
                <NavIcon>
                  <i class="fa fa-hourglass-start fa-2x" aria-hidden="true" />
                </NavIcon>
                <NavText>
                  <Link
                    to="/doctor/appointment/status"
                    style={{ textDecoration: "none" }}
                  >
                    APPOINTMENT STATUS
                  </Link>
                </NavText>
              </NavItem>
              <NavItem class="btn btn-primary" onClick={() => token[1](null)}>
                <NavIcon>
                  <i class="fa fa-sign-out fa-2x  " aria-hidden="true" />
                </NavIcon>
                <NavText>Logout</NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;

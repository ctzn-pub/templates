import React from 'react';
import Source from "../../../images/icons/Db.svg"
import Data from "../../../images/icons/source.svg"
import Cycle from "../../../images/icons/cycle.svg"
import Variable from "../../../images/icons/variable.svg"
import Observations from "../../../images/icons/observations.svg"
import Countryimg from "../../../images/icons/country.svg"
import styled from 'styled-components';
import { Table, Row, Col } from "reactstrap"
import  { Link } from 'gatsby';




const Itable = styled(Table)`
  padding: 0;
  margin-top: 30px;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
`
const Sourcebutton = styled.button`
  font-family: Arial;
  display: inline;
  padding: 0.3em 0.5em;
  margin: 0;
  margin: 3px;
  font-size: 55%;
  border-radius: 3px;
  background-color: #333a40;
  color: #fff;
  font-size: 55%;
  border: 1px solid #333a40;
  text-transform: uppercase;

  color: #fff;
  font-size: 55%;
  border: 1px solid #3071a9 !important;
  background: #3071a9 !important;
  text-transform: uppercase;
  font-weight: 500;
  transition: all 0.3s ease 0s;

 :hover {
  background-color: #333a40 !important;
  border: 1px solid #333a40 !important;
}
`


const Infotable = ({ source, time, obs, geo, vari }) => (
<Itable
            bordered
            className="infotable"
            style={{ marginTop: "2em", marginBottom: "10px" }}
            responsive
          >
            <thead>
              <tr>
                <th>
                  {" "}
                  <Data
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "9px",
                    }}
                  />{" "}
                  Data Source{" "}
                </th>
                <th>
                  {" "}
                  <Cycle
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "9px",
                    }}
                  />{" "}
                  Time Period
                </th>
                <th>
                  {" "}
                  <Countryimg
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "9px",
                    }}
                  />
                  Geography
                </th>
                <th>
                  {" "}
                  <Variable
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "9px",
                    }}
                  />
                  Original Variable
                </th>
                <th>
                  {" "}
                  <Observations
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "9px",
                    }}
                  />
                  Observations
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to={"/gallery?source=" + source.url}>
                    <Sourcebutton >
                      <Source
                        fill="#fff"
                        style={{
                          height: "10px",
                          width: "10px",
                          marginRight: "5px",
                          marginLeft: "5px",
                        }}
                      />
         {source.display}
                    </Sourcebutton>
                  </Link>
                </td>
                <td>{time}</td>
                <td>{geo}</td>
                <td>{vari}</td>
                <td>{obs}</td>
              </tr>
            </tbody>
          </Itable>
 
);

export default Infotable;

import Accordion from "@mui/material/Accordion";
import React, { Fragment, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { RECENT_ACTIVITY_MAIN_ADMIN } from "../../constants";
import Images from "../../images";
import "../ManageDistrict/ManageDistrict.css";
import "./RecentActivity.css";

export default function MainAdminRecentActivityTable() {
  // const { listAllBotCreator } = useSelector((state) => state.data);

  const [tableRow, setTableRow] = useState([]);
  function createData(id, botAdminName, domainName, status) {
    return {
      id,
      botAdminName,
      domainName,
      status,
    };
  }
  useEffect(() => {
    const row = RECENT_ACTIVITY_MAIN_ADMIN;
    const tempTableRow = [];
    row.map((data) => {
      const rowData = createData(
        data.id,
        data.botAdminName,
        data.domainName,
        data.status
      );
      tempTableRow.push(rowData);
      return null;
    });

    setTableRow(tempTableRow);
  }, []);
  return (
    <Fragment>
      <div style={{ marginTop: "1%" }}>
        {tableRow.map((row, index) => (
          <Accordion key={index} className="AccordionClass">
            <div className="accordionBody">
              <div className="imageHeader">
                <img
                  alt="Cindy Baker"
                  style={{ width: "30px", height: "30px" }}
                  src={
                    row.status === "create"
                      ? Images.create_icon
                      : row.status === "edit"
                      ? Images.edit_icon
                      : Images.man
                  }
                />

                <div className="userNameRecent">
                  {row.status === "create"
                    ? `Bot Admin Created Successfully`
                    : row.status === "edit"
                    ? `Bot Admin Edited Successfully`
                    : ""}
                </div>
              </div>
              <div className="courseSection">{row.botAdminName}</div>
              <div className="folderSection">{row.domainName}</div>
            </div>
          </Accordion>
        ))}
      </div>
    </Fragment>
  );
}

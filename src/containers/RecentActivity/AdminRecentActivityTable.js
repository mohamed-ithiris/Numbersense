import Accordion from "@mui/material/Accordion";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RECENT_ACTIVITY_ADMIN } from "../../constants";
import Images from "../../images";
import "../ManageDistrict/ManageDistrict.css";
import "./RecentActivity.css";

export default function AdminRecentActivityTable() {
  const { listAllBotCreator } = useSelector((state) => state.data);

  const [tableRow, setTableRow] = useState([]);
  function createData(id, message, status) {
    return {
      id,
      message,
      status,
    };
  }
  useEffect(() => {
    const row = RECENT_ACTIVITY_ADMIN;
    const tempTableRow = [];
    row.map((data) => {
      const rowData = createData(data.id, data.message, data.status);
      tempTableRow.push(rowData);
      return null;
    });

    setTableRow(tempTableRow);
  }, [listAllBotCreator]);
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
                    ? `${row.message} created`
                    : row.status === "edit"
                    ? `${row.message} edited`
                    : ""}
                </div>
              </div>
              <div className="courseSection">{row.message}</div>
            </div>
          </Accordion>
        ))}
      </div>
    </Fragment>
  );
}

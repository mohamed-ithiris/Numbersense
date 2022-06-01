import Accordion from "@mui/material/Accordion";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RECENT_ACTIVITY_USER } from "../../constants";
import Images from "../../images";
import "../ManageDistrict/ManageDistrict.css";
import "./RecentActivity.css";

export default function UserRecentActivityTable() {
  const { listAllBotCreator } = useSelector((state) => state.data);

  const [tableRow, setTableRow] = useState([]);
  function createData(id, lessonName, courseName, folderName, status) {
    return {
      id,
      lessonName,
      courseName,
      folderName,
      status,
    };
  }
  useEffect(() => {
    const row = RECENT_ACTIVITY_USER;
    const tempTableRow = [];
    row.map((data) => {
      const rowData = createData(
        data.id,
        data.lessonName,
        data.courseName,
        data.folderName,
        data.status
      );
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
                      : row.status === "delete"
                      ? Images.delete_icon
                      : row.status === "active"
                      ? Images.active_icon
                      : Images.man
                  }
                />

                <div className="userNameRecent">
                  {row.status === "create"
                    ? "sample lessonbot created"
                    : row.status === "edit"
                    ? "sample lessonbot edited"
                    : row.status === "delete"
                    ? "sample lessonbot deleted"
                    : row.status === "active"
                    ? "sample lessonbot activated"
                    : ""}
                </div>
              </div>
              <div className="courseSection">{row.courseName}</div>
              <div className="folderSection">{row.folderName}</div>
            </div>
          </Accordion>
        ))}
      </div>
    </Fragment>
  );
}

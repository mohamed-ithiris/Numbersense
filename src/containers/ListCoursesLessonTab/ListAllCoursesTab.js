import InfoIcon from "@mui/icons-material/Info";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import allActions from "../../redux/ducks/actions";
import "./ListAllCourses.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

function ListAllCoursesTabs() {
  const { userInfo, listAllCourses } = useSelector((state) => state.data); // From Redux
  // history
  const history = useHistory();

  // dispatch action
  const dispatch = useDispatch();
  const handleCourseClick = (subjectName, subjectId) => {
    dispatch(allActions.setCourseName(subjectName, subjectId));
    dispatch(allActions.getFolderList(subjectId, userInfo.LoginID));
    history.push(`dashboard/folders/${subjectId}`);
  };

  useEffect(() => {
    dispatch(allActions.getAllCourseList(userInfo.DomainID)); //passing districtId or domainid
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Carousel responsive={responsive}>
      {listAllCourses &&
        listAllCourses.map((courses, index) => (
          <dd key={index} className="DefinitionList">
            <ImageListItem
              onClick={() =>
                handleCourseClick(courses.SubjectName, courses.SubjectID)
              }
              sx={{
                boxShadow:
                  "rgb(0 0 0 / 20%) 0px 3px 25px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              <img
                key={index}
                src={courses.Image}
                alt={courses.SubjectName}
                style={{
                  borderRadius: "12px",
                  pointerEvents: "none",
                }}
                loading="lazy"
              />
              <ImageListItemBar
                title={courses.SubjectName}
                sx={{
                  borderBottomRightRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  background: "#000",
                  textTransform: "capitalize",
                }}
                actionIcon={
                  <Tooltip
                    // title="info"
                    title={courses.SubjectName}
                    arrow
                  >
                    <IconButton sx={{ color: "rgba(255, 255, 255, 1)" }}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </ImageListItem>
          </dd>
        ))}
    </Carousel>
  );
}

export default ListAllCoursesTabs;

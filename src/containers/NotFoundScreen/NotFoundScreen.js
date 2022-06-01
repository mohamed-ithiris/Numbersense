import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFoundScreen.css";

function NotFoundScreen() {
  const history = useHistory();
  return (
    <>
      <div className="Parent_404">
        <div className="Child_404">
          <div className="four_zero_four_bg">
            <Typography
              className="text-404"
              variant="h1"
              gutterBottom
              component="div"
            >
              404
            </Typography>
            <Typography
              className="T1"
              variant="h4"
              gutterBottom
              component="div"
            >
              Look like you're lost
            </Typography>
            <Typography
              className="T2"
              variant="h5"
              gutterBottom
              component="div"
            >
              the page you are looking for not avaible!
            </Typography>
            <SvgButton
              className="button-404"
              onClick={() => {
                history.push("/");
              }}
            >
              Go to Home
            </SvgButton>
          </div>
        </div>
      </div>
    </>
  );
}
const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref}>
      <polygon points="0,50 0,0 150,0 150,50" className="bg" />
      <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
    overflow: visible;
    cursor: pointer;
    --main-color: ${
      theme.palette.mode === "light" ? "#00c853" : "rgb(144,202,249)"
    };
    --hover-color: ${
      theme.palette.mode === "light"
        ? "rgba(25,118,210,0.04)"
        : "rgba(144,202,249,0.08)"
    };
    --active-color: ${
      theme.palette.mode === "light"
        ? "rgba(25,118,210,0.12)"
        : "rgba(144,202,249,0.24)"
    };
  
    & polygon {
      fill: transparent;
      transition: all 1200ms ease;
      pointer-events: none;
    }
    
    & .bg {
      stroke: #00c853;
      stroke-width: 0.5;
      filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
      fill: transparent;
    }
  
    & .borderEffect {
      stroke: #00c853;
      stroke-width: 7;
      stroke-dasharray: 150 600;
      stroke-dashoffset: 150;
      fill: transparent;
    }

    &:hover{
        & .content{
            font-family: cursive;
            font-size: 14px;
            font-weight: 200;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00c853;
            text-transform: uppercase;
            }
    }

  
    &:hover,
    &.${buttonUnstyledClasses.focusVisible} {
      .borderEffect {
        stroke-dashoffset: -600;
      }
  
      .bg {
        fill: var(--hover-color);
      }
    }
  
    &:focus,
    &.${buttonUnstyledClasses.focusVisible} {
      outline: none;
    }
  
    &.${buttonUnstyledClasses.active} { 
      & .bg {
        fill: var(--active-color);
        transition: fill 300ms ease-out;
      }
    }
  
    & foreignObject {
      pointer-events: none;
  
      & .content {
        font-family: cursive;
        font-size: 14px;
        font-weight: 200;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--main-color);
        text-transform: uppercase;
        background: #ccf4dd;
      }
  
      & svg {
        margin: 0 5px;
      }
    }`
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});
export default NotFoundScreen;

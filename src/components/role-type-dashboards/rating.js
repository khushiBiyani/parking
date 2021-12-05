import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center"
  },
  iconFilled: {},
  iconFilled1: { color: "red" },
  iconFilled2: { color: "orange" },
  iconFilled3: { color: "yellow" },
  iconFilled4: { color: "blue" },
  iconFilled5: { color: "green" },
  iconHover: {},
  iconHover1: { color: "red" },
  iconHover2: { color: "orange" },
  iconHover3: { color: "yellow" },
  iconHover4: { color: "blue" },
  iconHover5: { color: "green" }
});

export default function HoverRating() {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [iconFilledVar, setIconFilled] = useState(classes.iconFilled);
  const [iconHoverVar, setIconHover] = useState(classes.iconHover);

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          console.log(event, "This is th e event");
          setValue(newValue);
          switch (true) {
            case newValue <= 1: {
              setIconFilled(classes.iconFilled1);
              break;
            }
            case newValue <= 2 && newValue > 1: {
              setIconFilled(classes.iconFilled2);
              break;
            }
            case newValue <= 3 && newValue > 2: {
              setIconFilled(classes.iconFilled3);
              break;
            }
            case newValue <= 4 && newValue > 3: {
              setIconFilled(classes.iconFilled4);
              break;
            }
            case newValue > 4: {
              setIconFilled(classes.iconFilled5);
              break;
            }
          }
        }}
        onChangeActive={(event, newHover) => {
          switch (true) {
            case newHover <= 1: {
              setIconHover(classes.iconHover1);
              break;
            }
            case newHover <= 2 && newHover > 1: {
              setIconHover(classes.iconHover2);
              break;
            }
            case newHover <= 3 && newHover > 2: {
              setIconHover(classes.iconHover3);
              break;
            }
            case newHover <= 4 && newHover > 3: {
              setIconHover(classes.iconHover4);
              break;
            }
            case newHover > 4: {
              setIconHover(classes.iconHover5);
              break;
            }
          }
        }}
        defaultValue={2}
        icon={<FiberManualRecordIcon fontSize="inherit" />}
        classes={{
          iconFilled: iconFilledVar,
          iconHover: iconHoverVar
        }}
      />
    </div>
  );
}

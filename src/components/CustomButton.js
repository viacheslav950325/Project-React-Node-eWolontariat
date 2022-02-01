import * as React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  textTertiary: {
    color: theme.palette.tertiary.main,
  },
  outlinedTertiary: {
    color: theme.palette.tertiary.main,
    borderColor: theme.palette.tertiary.main,
    '&:hover': {
      color: theme.palette.tertiary.dark,
      borderColor: theme.palette.tertiary.dark,
    },
  },
  containedTertiary: {
    color: theme.palette.tertiary.contrastText,
    backgroundColor: theme.palette.tertiary.main,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: theme.palette.tertiary.dark,
    },
  }
}));

const CustomButton = React.forwardRef(function CustomButton(
  { variant = "text", color, className, ...other },
  ref
) {
  const classes = useStyles();
  return (
    <Button
      {...other}
      variant={variant}
      color={color === "tertiary" ? "primary" : color}
      className={clsx(className, {
        [classes[`${variant}Tertiary`]]: color === "tertiary"
      })}
      ref={ref}
    />
  );
});
export default CustomButton;
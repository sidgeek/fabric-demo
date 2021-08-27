import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSecret } from "../hooks/useSecret";

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function MySelect(props) {
  const classes = useStyles();
  const secret = useSecret();

  const { canvasSize = { width: 1, height: 1 }, onSelect } = props;

  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    onSelect(event.target.value);
    console.log(">>>>>secret", secret);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Canvas size
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          {canvasSize.map((e) => (
            <MenuItem value={e}>
              {e.width} / {e.height}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

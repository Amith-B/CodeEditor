import { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import validator from "validator";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "10px",
  },
  "align-right": {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function LogInForm({ handleLogIn }) {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (type) => (event) => {
    setCredentials({ ...credentials, [type]: event.target.value });
  };

  const isNotValidCredentials = () => {
    const { email, password } = credentials;
    if (
      !email ||
      !password ||
      !validator.isEmail(email) ||
      password.trim().length < 4
    )
      return true;

    return false;
  };

  return (
    <div>
      <FormControl
        size="small"
        variant="outlined"
        fullWidth
        required
        className={classes.margin}
      >
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          type={"email"}
          value={credentials.email}
          onChange={handleChange("email")}
          endAdornment={
            <InputAdornment position="end">
              <span className="material-icons">mail</span>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <FormControl
        size="small"
        variant="outlined"
        fullWidth
        required
        className={classes.margin}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={credentials.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                edge="end"
              >
                {showPassword ? (
                  <span className="material-icons">visibility</span>
                ) : (
                  <span className="material-icons">visibility_off</span>
                )}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      <div className={classes["align-right"]}>
        <Button
          disabled={isNotValidCredentials()}
          variant="contained"
          color="secondary"
          onClick={() => handleLogIn(credentials.email, credentials.password)}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

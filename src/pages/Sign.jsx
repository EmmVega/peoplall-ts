import { Card, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./styles/form.module.css";
import { Typography } from "@mui/material";
import { useState } from "react";
import { authToken, isLoggedInAtom, uIdAtom } from "../shared/store/store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import {
   validate,
   VALIDATOR_EMAIL,
   VALIDATOR_MINLENGTH,
} from "../shared/utils/validators";
import { useHttpClient } from "../shared/hooks/http-hook";

const Sign = () => {
   const [, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
   const setUid = useSetRecoilState(uIdAtom);
   const [token, setToken] = useRecoilState(authToken);
   const [signUpFormMode, setSignupFormMode] = useState(true);
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const history = useHistory();
   const { sendRequest } = useHttpClient();
   const [passIsValid, setPassIsValid] = useState(true);
   const [emailIsValid, setEmailIsValid] = useState(true);

   const emailValidator = () => {
      const emailIsValid = validate(email, [VALIDATOR_EMAIL()]);
      setEmailIsValid(emailIsValid);
   };

   const passValidator = () => {
      const passIsValid = validate(password, [VALIDATOR_MINLENGTH(6)]);
      setPassIsValid(passIsValid);
   };

   const signHandler = async () => {
      const url = signUpFormMode ? "signin" : "signup";
      if (emailIsValid && passIsValid) {
         console.log("pasan");
         try {
            const response = await sendRequest(
               `http://localhost:5000/api/user/${url}`,
               "POST",
               JSON.stringify({
                  email,
                  password,
               }),
               {
                  "Content-Type": "application/json",
                  authorization: "Bearer " + token,
               }
            );
            setIsLoggedIn(true);
            setUid(response.user._id);
            setToken(response.token);
            localStorage.setItem(
               "userData",
               JSON.stringify({
                  userId: response.user._id,
                  token: response.token,
               })
            );
            history.goBack();
         } catch (err) {}
      }
   };

   return (
      <Grid
         container
         justifyContent="center"
         style={{
            height: "100%",
            marginTop: "180px",
         }}
      >
         <Grid item>
            <Card style={{ width: "500px", height: "270px" }}>
               <form action="" className={classes.form}>
                  <TextField
                     label="email"
                     color="secondary"
                     focused
                     sx={{ m: "10px" }}
                     value={email}
                     onChange={(e) => {
                        setEmail(e.target.value);
                     }}
                     error={!emailIsValid}
                     onBlur={emailValidator}
                  />
                  {!emailIsValid && (
                     <Typography align="center" color="error">
                        Please enter a valid email
                     </Typography>
                  )}
                  <TextField
                     label="password"
                     color="secondary"
                     type="password"
                     focused
                     sx={{ m: "10px" }}
                     value={password}
                     onChange={(e) => {
                        setPassword(e.target.value);
                     }}
                     error={!passIsValid}
                     onBlur={passValidator}
                  />
                  {!passIsValid && (
                     <Typography align="center" color="error">
                        Password must be at least 6 chars
                     </Typography>
                  )}
                  <Typography align="center">
                     {`${
                        signUpFormMode
                           ? "Does not have an account?"
                           : "have an account?"
                     }`}
                     <Button
                        onClick={() => {
                           setSignupFormMode(!signUpFormMode);
                        }}
                        variant="text"
                     >
                        Sign {`${signUpFormMode ? "up!" : "in!"}`}
                     </Button>
                  </Typography>
                  <Button
                     variant="contained"
                     color="primary"
                     sx={{ m: "10px" }}
                     onClick={signHandler}
                     disabled={!emailIsValid || !passIsValid}
                  >
                     Sign {`${signUpFormMode ? "in!" : "up!"}`}
                  </Button>
               </form>
            </Card>
         </Grid>
      </Grid>
   );
};

export default Sign;

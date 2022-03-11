import { Card, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./styles/form.module.css";
import { Typography } from "@mui/material";
import { useState } from "react";
import { isLoggedInAtom } from "../shared/store/store";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

const Sign = () => {
   const [signUpFormMode, setSignupFormMode] = useState(true);
   const [, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
   const history = useHistory();

   const signHandler = () => {
      if (signUpFormMode) setIsLoggedIn(true);
      history.goBack();
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
                  />
                  <TextField
                     label="password"
                     color="secondary"
                     type="password"
                     focused
                     sx={{ m: "10px" }}
                  />
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

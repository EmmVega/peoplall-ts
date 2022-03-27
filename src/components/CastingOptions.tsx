import * as React from "react";
import Button from "@mui/material/Button";
// import DeleteIcon from '@mui/icons-material/Delete';
// import Icon from '@mui/material/Icon';
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { isLoggedInAtom, uIdAtom } from "../shared/store/store";
import { IconButton } from "@material-ui/core";
import { useHttpClient } from "../shared/hooks/http-hook";

const style = {
   position: "absolute" as "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

type Props = {
   cId: String;
};

export default function CastingOptions(props: Props) {
   const [uId] = useRecoilState(uIdAtom);
   const { error, sendRequest, clearError } = useHttpClient();
   const [isLoggedIn] = useRecoilState(isLoggedInAtom);
   const history = useHistory();
   const [modalStatus, setModalStatus] = useState<any>({
      isActive: false,
      button: "",
      error: "",
   });
   const { cId } = props;

   const handleClose = () => {
      clearError();
      setModalStatus(() => ({
         isActive: false,
      }));
   };

   const getBack = () => {
      history.goBack();
   };
   const goBoard = () => {
      history.push("/board");
   };

   const addCasting = async () => {
      if (isLoggedIn) {
         let response;
         try {
            response = await sendRequest(
               `http://localhost:5000/api/user/addCasting`,
               "POST",
               JSON.stringify({
                  casting: { _id: cId, status: "pinned" },
                  uId,
               }),
               {
                  "Content-Type": "application/json",
               }
            );
         } catch (err) {}

         if (response?.message === "Successful") {
            setModalStatus({
               isActive: true,
               button: "add",
               error: null,
            });
         } else {
            setModalStatus({
               isActive: true,
               error: error,
            });
         }
      } else history.push("/sign");
   };

   const applyOnCasting = async () => {
      if (isLoggedIn) {
         let response;
         try {
            response = await sendRequest(
               `http://localhost:5000/api/user/addCasting`,
               "POST",
               JSON.stringify({
                  casting: { _id: cId, status: "applied" },
                  uId,
               }),
               {
                  "Content-Type": "application/json",
               }
            );
         } catch (err) {}

         if (response?.message === "Successful") {
            setModalStatus({
               isActive: true,
               button: "apply",
            });
         } else {
            setModalStatus({
               isActive: true,
            });
         }
      } else history.push("/sign");
   };

   return (
      <>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalStatus.isActive}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={modalStatus.isActive}>
               <Box sx={style}>
                  <Button
                     variant="outlined"
                     onClick={handleClose}
                     size="small"
                     sx={{ p: 0, ml: 43 }}
                  >
                     <IconButton color="default" size="small">
                        x
                     </IconButton>
                  </Button>
                  <Typography
                     id="transition-modal-title"
                     variant="h6"
                     component="h2"
                  >
                     {modalStatus.button === "add" && !error && (
                        <div>Has agregado este casting</div>
                     )}
                     {modalStatus.button === "apply" && !error && (
                        <div>Has aplicado a este casting</div>
                     )}
                     {error && <div>{error}</div>}
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                     {modalStatus.button === "add" &&
                        !error &&
                        "Puedes encontrarlo fácilmente en tu tablero"}
                     {modalStatus.button === "apply" &&
                        !error &&
                        "También se agregó a tu tablero para que puedas ver el status. ¡Mucha suerte!"}
                  </Typography>
                  <Stack direction="row" justifyContent="center" spacing={2}>
                     <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={getBack}
                     >
                        Castings
                     </Button>
                     <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={goBoard}
                     >
                        Tablero
                     </Button>
                  </Stack>
               </Box>
            </Fade>
         </Modal>

         <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
               variant="outlined"
               startIcon={<ArrowBackIcon />}
               onClick={getBack}
            >
               Regresar
            </Button>
            <Button
               variant="outlined"
               startIcon={<AddCircleOutlineIcon />}
               onClick={addCasting}
            >
               Agregar al tablero
            </Button>
            <Button
               variant="contained"
               endIcon={<SendIcon />}
               onClick={applyOnCasting}
            >
               Aplicar
            </Button>
         </Stack>
      </>
   );
}

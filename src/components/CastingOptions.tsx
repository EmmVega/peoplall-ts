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

export default function CastingOptions() {
   const history = useHistory();
   const [modalStatus, setModalStatus] = useState({
      isActive: false,
      button: "",
   });

   const handleClose = () =>
      setModalStatus((prevProps) => ({
         isActive: false,
         button: prevProps.button,
      }));

   const getBack = () => {
      history.push("/");
   };
   const goBoard = () => {
      history.push("/account");
   };

   const addCasting = () =>
      setModalStatus({
         isActive: true,
         button: "add",
      });

   const applyOnCasting = () =>
      setModalStatus({
         isActive: true,
         button: "apply",
      });

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
                  <Typography
                     id="transition-modal-title"
                     variant="h6"
                     component="h2"
                  >
                     {modalStatus.button === "add"
                        ? "Se agregó al tablero"
                        : "Has aplicado a este casting"}
                  </Typography>

                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                     {modalStatus.button === "add"
                        ? "Puedes encontrarlo fácilmente en tu tablero"
                        : "Queda esperar a que se comuniquen contigo"}
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

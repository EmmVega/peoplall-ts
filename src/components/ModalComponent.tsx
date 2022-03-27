import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IconButton } from "@material-ui/core";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";

type Props = {
   modalStatus: { isActive: boolean; button: string };
   handleClose: () => void;
   error: any;
   getBack: () => void;
   goBoard: () => void;
};

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

const ModalComponent = (props: Props) => {
   const { modalStatus, handleClose, error, getBack, goBoard } = props;

   return (
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
   );
};

export default ModalComponent;

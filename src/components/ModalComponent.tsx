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
import { useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

type Props = {
   modalStatus: { isActive: boolean; button?: string; settings?: boolean };
   handleClose: () => void;
   error?: any;
   getBack?: () => void;
   goBoard?: () => void;
   video?: string;
   onFileUpload: ({}) => any;
};

const ModalComponent = (props: Props) => {
   const { modalStatus, handleClose, error, goBoard, video, onFileUpload } =
      props;
   const history = useHistory();
   const pdfPicker = useRef<any>();
   const [file, setFile] = useState();
   const [previewUrl, setPreviewUrl] = useState<any>();
   const [isValid, setIsValid] = useState(false);

   useEffect(() => {
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.onload = () => {
         setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      console.log("PICKED FILE: ", { cv: file });
      // console.log("PREVIEWURL: ", previewUrl
   }, [file]);

   const getBack = () => {
      history.goBack();
   };

   const pickPdfHandler = () => {
      pdfPicker.current.click();
   };

   const pickedHandler = (e: any) => {
      let pickedFile;
      if (e.target.files && e.target.files.length === 1) {
         pickedFile = e.target.files[0];
         setFile(pickedFile);
         setIsValid(true);
      } else setIsValid(false);

      onFileUpload({ cv: pickedFile });
   };

   const style = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: video ? 700 : 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
   };

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
               {video && !modalStatus.settings && (
                  <iframe
                     width="700"
                     height="506"
                     src="https://www.youtube.com/embed/9PnOG67flRA"
                     title="YouTube video player"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
               )}
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

               {modalStatus.button && (
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
               )}

               {modalStatus.settings && (
                  <>
                     <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                     >
                        Ingresa el archivo
                     </Typography>
                     <input
                        id="file-upload"
                        type="file"
                        style={{ display: "none" }}
                        accept=".pdf"
                        ref={pdfPicker}
                        onChange={pickedHandler}
                     />
                     <Button variant="outlined" onClick={pickPdfHandler}>
                        {" "}
                        PICK PDF
                     </Button>
                     <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                     >
                        PREVIEWURL : {previewUrl}
                     </Typography>
                     |
                     {!modalStatus.settings && (
                        <Stack
                           direction="row"
                           justifyContent="center"
                           spacing={2}
                        >
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
                     )}
                  </>
               )}
            </Box>
         </Fade>
      </Modal>
   );
};

export default ModalComponent;

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInAtom, uIdAtom } from "../shared/store/store";
import { useHttpClient } from "../shared/hooks/http-hook";
import ModalComponent from "./ModalComponent";

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
         <ModalComponent
            modalStatus={modalStatus}
            handleClose={handleClose}
            error={error}
            goBoard={goBoard}
            getBack={getBack}
         />
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

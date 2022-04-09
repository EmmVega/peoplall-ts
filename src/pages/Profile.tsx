import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import PageviewIcon from "@mui/icons-material/Pageview";
import AssignmentIcon from "@mui/icons-material/Assignment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button, Grid } from "@material-ui/core";
import ModalComponent from "../components/ModalComponent";
import { useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useRecoilState } from "recoil";
import { uIdAtom } from "../shared/store/store";
import { saveAs } from "file-saver";

const Profile = () => {
   const { error, sendRequest, clearError } = useHttpClient();
   const [modalStatus, setModalStatus] = useState<any>({
      isActive: false,
      settings: false,
   });
   const [uId] = useRecoilState(uIdAtom);
   const [cv, setCv] = useState();

   const handleClose = () => {
      setModalStatus({ isActive: false });
   };

   const handleOpen = () => {
      setModalStatus({ isActive: true });
   };

   const openWithSettings = () => {
      setModalStatus({ isActive: true, settings: true });
   };

   const downloadCv = async () => {
      try {
         const response = await sendRequest(
            `http://localhost:5000/api/user/${uId}/settings/cv`,
            "GET",
            null,
            {
               "Content-Type": "multipart/form-data",
               responseType: "arraybuffer",
            }
         );
         console.log("response file", response);
         setCv(response);

         const blob = new Blob([response], { type: "application/pdf" });
         saveAs(blob, "cv");
      } catch (err) {
         console.log(error);
      }
   };

   const uploadFileHandler = async (file: any) => {
      try {
         const formData = new FormData();
         formData.append("cv", file.cv);
         formData.append("uId", uId || "");
         const response = await sendRequest(
            `http://localhost:5000/api/user/settings/cv`,
            "POST",
            formData
         );
         console.log("response file", response);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <>
         <ModalComponent
            modalStatus={modalStatus}
            handleClose={handleClose}
            video={"true"}
            onFileUpload={uploadFileHandler}
         />
         <Button variant="outlined" onClick={openWithSettings}>
            Settings
         </Button>
         <Grid
            container
            justifyContent="space-evenly"
            alignItems="center"
            style={{
               height: "100%",
               marginTop: "200px",
            }}
         >
            <Avatar
               sx={{
                  bgcolor: "#ff3030",
                  width: 156,
                  height: 156,
                  cursor: "pointer",
               }}
               onClick={handleOpen}
            >
               <YouTubeIcon sx={{ width: 86, height: 86 }} />
               <div>DEMO REEL</div>
            </Avatar>
            <Button href={cv} onClick={downloadCv}>
               <Avatar
                  sx={{
                     bgcolor: "green",
                     width: 156,
                     height: 156,
                     cursor: "pointer",
                  }}
                  onClick={downloadCv}
               >
                  <AssignmentIcon sx={{ width: 86, height: 86 }} />
                  <div>CV</div>
               </Avatar>
            </Button>
            <Avatar sx={{ bgcolor: "#ffe863", width: 156, height: 156 }}>
               <FolderIcon sx={{ width: 86, height: 86 }} />
               <div>BOOK</div>
            </Avatar>
            <Avatar sx={{ bgcolor: "#5bb1fc", width: 156, height: 156 }}>
               <PageviewIcon sx={{ width: 86, height: 86 }} />
               <div>SOCIAL MEDIA</div>
            </Avatar>
         </Grid>
      </>
   );
};

export default Profile;

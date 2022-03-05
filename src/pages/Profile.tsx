import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import FolderIcon from "@mui/icons-material/Folder";
import PageviewIcon from "@mui/icons-material/Pageview";
import AssignmentIcon from "@mui/icons-material/Assignment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid } from "@material-ui/core";

const Profile = () => {
   return (
      <Grid
         container
         justifyContent="space-evenly"
         alignItems="center"
         style={{
            height: "100%",
            marginTop: "200px",
         }}
      >
         <Avatar sx={{ bgcolor: "#ff3030", width: 156, height: 156 }}>
            <YouTubeIcon sx={{ width: 86, height: 86 }} />
            <div>DEMO REEL</div>
         </Avatar>
         <Avatar sx={{ bgcolor: "green", width: 156, height: 156 }}>
            <AssignmentIcon sx={{ width: 86, height: 86 }} />
            <div>CV</div>
         </Avatar>
         <Avatar sx={{ bgcolor: "#ffe863", width: 156, height: 156 }}>
            <FolderIcon sx={{ width: 86, height: 86 }} />
            <div>BOOK</div>
         </Avatar>
         <Avatar sx={{ bgcolor: "#5bb1fc", width: 156, height: 156 }}>
            <PageviewIcon sx={{ width: 86, height: 86 }} />
            <div>SOCIAL MEDIA</div>
         </Avatar>
      </Grid>
   );
};

export default Profile;

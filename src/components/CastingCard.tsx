import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";

export default function CastingCard() {
   const history = useHistory();

   const goCasting = () => {
      history.push("/casting");
   };
   return (
      <Card sx={{ minWidth: "20%", maxWidth: "20%", m: 4 }}>
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               Casting
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Lizards are a widespread group of squamate reptiles, with over
               6,000 species, ranging across all continents except Antarctica
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small">Share</Button>
            <Button size="small" onClick={goCasting}>
               Learn More
            </Button>
         </CardActions>
      </Card>
   );
}

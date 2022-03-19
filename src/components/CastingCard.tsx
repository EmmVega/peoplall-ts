import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";

export type CastingData = {
   _id: string;
   productor: string;
   director: string;
   dp: string;
   date: string;
   title: string;
   personal: { age: string; generx: string };
   info: string;
   industry: string;
   status: string;
};

type Props = {
   castingData: CastingData;
};

export default function CastingCard(props: Props) {
   const history = useHistory();

   const goCasting = (id: string) => {
      history.push(`/casting/${id}`);
   };

   const { castingData } = props;
   return (
      <Card sx={{ minWidth: "20%", maxWidth: "20%", m: 4 }}>
         <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {castingData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Obra de {castingData.industry} dirigida por{" "}
               {castingData.director} y producida por {castingData.productor}
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small">Share</Button>
            <Button
               size="small"
               onClick={() => {
                  goCasting(castingData._id);
               }}
            >
               Open
            </Button>
            <Button size="small">{castingData.status}</Button>
         </CardActions>
      </Card>
   );
}

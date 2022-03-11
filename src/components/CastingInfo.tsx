import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CastingData } from "../pages/Casting";

type Props = {
   castingData: CastingData;
};

const CastingInfo = (props: Props) => {
   //  const castingData: object = props.castingData;
   //  console.log(castingData.title);
   console.log(props.castingData);
   const { castingData } = props;
   return (
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 5, ml: 5 }}>
         <Typography variant="h2" gutterBottom component="div">
            {castingData.title}
         </Typography>
         <Typography variant="h3" gutterBottom component="div">
            {castingData.director}
         </Typography>
         <Typography variant="h4" gutterBottom component="div">
            {castingData.dp}
         </Typography>
         <Typography variant="h5" gutterBottom component="div">
            {castingData.productor}
         </Typography>
         <Typography variant="h6" gutterBottom component="div">
            Fecha límite: {castingData.date}
         </Typography>
         <Typography variant="body1" gutterBottom>
            Se busca actriz/actor {castingData.personal.generx} de{" "}
            {castingData.personal.age} años de edad o que los aparente para la
            industria de {castingData.industry}
         </Typography>
         <Typography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
         </Typography>
      </Box>
   );
};

export default CastingInfo;

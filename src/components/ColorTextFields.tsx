import * as React from "react";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import { TextField } from "@mui/material";

import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
// import Button from "@mui/material/Button";

const industrias = [
   {
      type: "Television",
      label: "TV",
   },
   {
      type: "Cine",
      label: "C",
   },
   {
      type: "Teatro",
      label: "T",
   },
   {
      type: "Videoclips",
      label: "V",
   },
   {
      type: "Publicidad",
      label: "P",
   },
];

const generos = ["Femenina", "Masculino"];

export default function ColorTextFields() {
   const [selectedIndustry, setSelectedIndustry] = React.useState("Cine");
   const [selectedGenre, setSelectedGenre] = React.useState("Femenina");

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedIndustry(event.target.value);
   };

   return (
      <Box
         component="form"
         sx={{
            mx: "auto",
            width: "50vw",
            mt: 5,
            mb: 5,
            display: { xs: "flex" },
         }}
         noValidate
         autoComplete="off"
      >
         <TextField
            label="Industria"
            color="secondary"
            focused
            sx={{ m: "auto", width: 200 }}
            select
            onChange={handleChange}
            value={selectedIndustry}
         >
            {industrias.map((option) => (
               <MenuItem key={option.type} value={option.type}>
                  {option.type}
               </MenuItem>
            ))}
         </TextField>
         <TextField
            label="Genero"
            color="secondary"
            focused
            sx={{ m: "auto", width: 200 }}
            select
            onChange={(e) => {
               setSelectedGenre(e.target.value);
            }}
            value={selectedGenre}
         >
            {generos.map((option) => (
               <MenuItem key={option} value={option}>
                  {option}
               </MenuItem>
            ))}
         </TextField>
         <TextField
            label="Ciudad"
            color="secondary"
            focused
            sx={{ m: "auto" }}
         />
         <Button variant="contained" color="primary">
            BUSCAR
         </Button>
      </Box>
   );
}

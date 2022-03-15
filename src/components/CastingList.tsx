import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import { CastingData } from "../pages/Casting";

// function createData(
//    id: number,
//    productor: string,
//    director: string,
//    dp: string,
//    date: number
// ) {
//    return { id, productor, director, dp, date };
// }

// const rows = [
//    createData(1, "20th Century Films", "Guillermo del Toro", "El chivo", 2.14),
//    createData(2, "Yllusion", "Carlos Vega Mecinas", "Alex Walker", 6.5),
//    createData(3, "Fox", "Alfonso Cuaron", "no sé quién", 8.11),
//    createData(4, "HBO", "Alejandro Gonzalez Iñarritu", "Ingmar Bergman", 12.2),
//    createData(5, "Netflix", "Enrique Segobiano", "No me sé más", 4.7),
// ];

type Props = {
   rows: CastingData[];
};

export default function CastingList(props: Props) {
   const history = useHistory();

   const goToCasting = (id: string) => {
      history.push(`/casting/${id}`);
   };

   const { rows } = props;
   return (
      <TableContainer component={Paper}>
         <Table sx={{ maxWidth: 1024, m: "auto" }} aria-label="simple table">
            <TableHead>
               <TableRow style={{ backgroundColor: "#3275c7" }}>
                  <TableCell style={{ color: "white" }}>PRODUCTORA </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                     DIRECTOR
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                     DP
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                     FECHA
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {rows.map((row) => (
                  <TableRow
                     key={row.productor}
                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                     onClick={goToCasting.bind(null, row.id)}
                     hover
                     style={{ cursor: "pointer" }}
                  >
                     <TableCell component="th" scope="row">
                        {row.productor}
                     </TableCell>
                     <TableCell align="right">{row.director}</TableCell>
                     <TableCell align="right">{row.dp}</TableCell>
                     <TableCell align="right">{row.date}</TableCell>
                  </TableRow>
               ))}
               {!rows.length && (
                  <p style={{ color: "blue" }}>
                     No existen castings con esa búsqueda
                  </p>
               )}
            </TableBody>
         </Table>
      </TableContainer>
   );
}

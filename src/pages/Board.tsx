import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CastingCard, { CastingData } from "../components/CastingCard";
import { useHttpClient } from "../shared/hooks/http-hook";
import { uIdAtom } from "../shared/store/store";

const Board = () => {
   // const castingsOnboard = [
   //    {
   //       id: 1,
   //    },
   //    {
   //       id: 2,
   //    },
   //    {
   //       id: 3,
   //    },
   //    {
   //       id: 4,
   //    },
   //    {
   //       id: 5,
   //    },
   //    {
   //       id: 6,
   //    },
   // ];
   const { sendRequest } = useHttpClient();
   const [castings, setCastings] = useState<CastingData[]>([]);
   const [uId] = useRecoilState(uIdAtom);

   const fetchCastings = async () => {
      try {
         const response = await sendRequest(
            `http://localhost:5000/castings/board/${uId}`
         );
         setCastings(response);
         console.log(response);
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      fetchCastings();
   }, []);

   return (
      <div
         style={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
         }}
      >
         {castings.map((cast) => (
            <CastingCard key={cast._id} castingData={cast} />
         ))}
         {!castings.length && <div>No hay castings en este tablero</div>}
      </div>
   );
};

export default Board;

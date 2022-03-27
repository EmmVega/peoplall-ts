import React, { useEffect, useState } from "react";
import CastingOptions from "../components/CastingOptions";
// import Info from '../components/CastingInfo'
import CastingInfo from "../components/CastingInfo";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

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
};

const Casting: React.FC = () => {
   const { error, sendRequest } = useHttpClient();
   const [castingData, setCastingData] = useState<CastingData>({
      _id: "",
      productor: "",
      director: "",
      dp: "",
      date: "",
      title: "",
      personal: { age: "", generx: "" },
      info: "",
      industry: "",
   });
   const cid = useParams<{ cid: string }>().cid;

   useEffect(() => {
      const fetchCast = async () => {
         try {
            const response = await sendRequest(
               `http://localhost:5000/castings/${cid}`
            );
            setCastingData(response);
         } catch (err) {
            console.log(error);
         }
      };
      fetchCast();
   }, []);

   return (
      <>
         {castingData._id.length ? (
            <CastingInfo castingData={castingData} />
         ) : (
            <p>Cargando...</p>
         )}
         <CastingOptions cId={castingData._id} />
      </>
   );
};

export default Casting;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CastingList from "../components/CastingList";
import ColorTextFields from "../components/ColorTextFields";
import { useHttpClient } from "../shared/hooks/http-hook";

const Home = () => {
   const { sendRequest } = useHttpClient();
   const [rows, setRows] = useState<any[]>([]);
   const history = useHistory();

   const fetchCastings = async (ind: any, gen: any) => {
      let castingsResponse;
      try {
         castingsResponse =
            ind && gen
               ? await sendRequest(
                    `http://localhost:5000/castings/?ind=${ind}&gen=${gen}`
                 )
               : await sendRequest("http://localhost:5000/");
         setRows(castingsResponse);
      } catch (err) {}
   };

   useEffect(() => {
      fetchCastings(null, null);
   }, []);

   const filterCast = (ind: any, gen: any) => {
      fetchCastings(ind, gen);
      if (!ind && !gen) history.push(`/`);
      else history.push(`/castings/?ind=${ind}&gen=${gen}`);
   };

   return (
      <div>
         <ColorTextFields filterCast={filterCast} />
         <CastingList rows={rows} />
      </div>
   );
};

export default Home;

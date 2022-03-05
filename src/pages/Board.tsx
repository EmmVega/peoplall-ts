import CastingCard from "../components/CastingCard";

const Board = () => {
   const castingsOnboard = [
      {
         id: 1,
      },
      {
         id: 2,
      },
      {
         id: 3,
      },
      {
         id: 4,
      },
      {
         id: 5,
      },
      {
         id: 6,
      },
   ];

   return (
      <div
         style={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
         }}
      >
         {castingsOnboard.map((cast) => (
            <CastingCard key={cast.id} />
         ))}
      </div>
   );
};

export default Board;

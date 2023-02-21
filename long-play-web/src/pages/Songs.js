import React from "react";
import { useQuery } from "react-query";
import { getCountOfSongs } from "../API-utils/endpointsManageSongs";

const Songs = () => {
  let numberOfSongs;

  const { status: isNumberSongs, data: songs_amount } = useQuery(
    "songs_amount",
    getCountOfSongs,
    { retry: 0 }
  );

  if (isNumberSongs === "success") {
    numberOfSongs = (
      <div className="db-amount">
        {" "}
        Liczba utworów w bazie:
        <p className="db-amount__value">{songs_amount.amount}</p>
      </div>
    );
  }

  return <div>{numberOfSongs}</div>;
};

export default Songs;

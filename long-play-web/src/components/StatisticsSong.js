import React from "react";
import StatisticsSong from "../components/StatisticsSong";
import { useParams } from "react-router-dom";
import { getStatisticsOfSong } from "../API-utils/endpointsManageRates";
import { useQuery } from "react-query";
import { Star } from "@material-ui/icons";

const StatisticsAlbum = () => {
  const { id_song } = useParams();

  const { status, data: statisticsSong } = useQuery(
    ["statistics-song", id_song],
    () => getStatisticsOfSong(id_song),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  let contentStatistics;

  if (status === "success") {
    contentStatistics = (
      <>
        {statisticsSong.quantity === 0 ? (
          <div className="statistics__box">
            <Star className="star-icon-stats" />
            <p>Brak ocen</p>
          </div>
        ) : (
          <div className="statistics__container">
            <div className="statistics__box">
              <Star className="star-icon-stats" />
              <p className="statistics__mean">
                {parseFloat(statisticsSong.mean)}
              </p>
            </div>
            <div className="statistics__box statistics__box--flexDirection">
              <p className="statistics__item">Liczba ocen</p>
              <p className="statistics__item statistics__item--margin">
                {statisticsSong.quantity}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return <section className="statistics">{contentStatistics}</section>;
};

export default StatisticsAlbum;

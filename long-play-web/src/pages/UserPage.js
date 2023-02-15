import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, userData } from "../API-utils/endpointsAuthUser";
import {
  getAllRatesByUser,
  getStatisticsOfAllRatesByUser,
} from "../API-utils/endpointsManageRates";
import { useQuery } from "react-query";
import { Star, Favorite } from "@material-ui/icons";

const UserPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  let userIsLogged = false;
  let user_info;
  let content;
  let contentStats;
  let contentLastRates;

  const { status, data } = useQuery("user", userAuth, { retry: 0 });
  const { status: isUser, data: user } = useQuery(
    ["user-data", username],
    () => userData(username),
    { retry: 0 }
  );

  const { status: isStats, data: stats } = useQuery(
    ["user-stats", username],
    () => getStatisticsOfAllRatesByUser(username),
    { retry: 0 }
  );

  const { status: isLastRates, data: lastRates } = useQuery(
    ["last-rates", username],
    () => getAllRatesByUser(username),
    { retry: 0 }
  );

  if (status === "success") {
    if (data.user.username === username) {
      userIsLogged = true;
    }
  }

  if (isUser === "error") {
    navigate("/404");
  }
  if (isUser === "success") {
    user_info = user;
    content = <InfoAccount person={{ userIsLogged, user_info }} />;
  }

  if (isStats === "success") {
    contentStats = (
      <div className="stats">
        <section className="stats__box">
          <h2 className="stats__title">Wszystkie oceny</h2>

          <div className="stats__container">
            <div className="stats__item">
              <h3 className="stats__item-title">Oceny</h3>
              <p className="stats__item-value">
                <Star className="icon-user-page" />
                {stats.num_rates}
              </p>
            </div>
            <div className="stats__item">
              <h3 className="stats__item-title">Ulubione</h3>
              <p className="stats__item-value">
                <Favorite className="icon-user-page" />
                {stats.num_fav}
              </p>
            </div>
            <div className="stats__item">
              <h3 className="stats__item-title">Średnia ocen</h3>
              <p className="stats__item-value">
                <Star className="icon-user-page" />
                {stats.avg_rates !== null
                  ? parseFloat(stats.avg_rates)
                  : "BRAK"}
              </p>
            </div>
          </div>
        </section>
        <section className="stats__box">
          <h2 className="stats__title">Albumy</h2>
          <div className="stats__container">
            <div className="stats__item">
              <h3 className="stats__item-title">Oceny</h3>
              <p className="stats__item-value">
                <Star className="icon-user-page" />
                {stats.num_rates_ma}
              </p>
            </div>
            <div className="stats__item">
              <h3 className="stats__item-title">Ulubione</h3>
              <p className="stats__item-value">
                <Favorite className="icon-user-page" />
                {stats.num_fav_ma}
              </p>
            </div>
            <div className="stats__item">
              <h3 className="stats__item-title">Średnia ocen</h3>
              <p className="stats__item-value">
                <Star className="icon-user-page" />
                {stats.avg_ma !== null ? parseFloat(stats.avg_ma) : "BRAK"}
              </p>
            </div>
          </div>
        </section>
        <section className="stats__box">
          <h2 className="stats__title">Utwory</h2>

          <div className="stats__container">
            <div className="stats__item">
              <h3 className="stats__item-title">Oceny</h3>
              <p className="stats__item-value">
                <Star className="icon-user-page" />
                {stats.num_rates_s}
              </p>
            </div>
            <div className="stats__item">
              <h3 className="stats__item-title">Ulubione</h3>
              <p className="stats__item-value">
                <Favorite className="icon-user-page" />
                {stats.num_fav_s}
              </p>
            </div>
            <div className="stats__item">
              <h3 className="stats__item-title">Średnia ocen</h3>
              <p className="stats__item-value">
                <Star className="icon-user-page" />
                {stats.avg_s !== null ? parseFloat(stats.avg_s) : "BRAK"}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isLastRates === "success") {
    contentLastRates = (
      <div>
        {lastRates.length !== 0 ? (
          lastRates.map((rate) => <div key={rate.id_rate}></div>)
        ) : (
          <div>Brak jakichkolwiek ocen</div>
        )}
      </div>
    );
  }

  return (
    <>
      {content}
      <section className="managing-music">
        <NavLink
          end
          to={"/user/".concat(`${username}`)}
          className={({ isActive }) =>
            isActive
              ? "heroUser__choose-link heroUser__choose-link--selected"
              : "heroUser__choose-link"
          }
        >
          <p className="heroUser__settings-link">Profil główny</p>
        </NavLink>
        <NavLink
          end
          to={"/user/".concat(`${username}`, "/albums")}
          className={({ isActive }) =>
            isActive
              ? "heroUser__choose-link heroUser__choose-link--selected"
              : "heroUser__choose-link"
          }
        >
          <p className="heroUser__settings-link">Oceny albumów</p>
        </NavLink>
        <NavLink
          end
          to={"/user/".concat(`${username}`, "/songs")}
          className={({ isActive }) =>
            isActive
              ? "heroUser__choose-link heroUser__choose-link--selected"
              : "heroUser__choose-link"
          }
        >
          <p className="heroUser__settings-link">Oceny utworów</p>
        </NavLink>
      </section>

      {contentStats}

      <h2>Ostatnio ocenione pozycje</h2>
      {contentLastRates}
    </>
  );
};

export default UserPage;

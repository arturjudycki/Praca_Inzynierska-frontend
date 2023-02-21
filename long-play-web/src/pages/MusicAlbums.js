import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, userData } from "../API-utils/endpointsAuthUser";
import { getStatisticsOfAlbum } from "../API-utils/endpointsManageRates";
import { useQuery } from "react-query";
import { Favorite, Star } from "@material-ui/icons";
import { getAllRatesAlbumsByUserQuery } from "../API-utils/endpointsManageRates";
import { img_path } from "../API-utils/links";

const MusicAlbums = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <div>Baza albumów</div>
      {/* <section className="user-page__options">
        <div className="user-page__sorters">
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">daty ocen:</div>
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "rating-date_DESC";
                  handleSearchParams(option);
                }}
                style={
                  !searchParams.has("sortBy")
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najnowsze
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "rating-date_ASC";
                  handleSearchParams(option);
                }}
                style={
                  searchParams.get("sortBy") === "rating-date_ASC"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najstarsze
              </div>
            </div>
          </div>
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">oceny:</div>
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "numerical-rating_DESC";
                  handleSearchParams(option);
                }}
                style={
                  searchParams.get("sortBy") === "numerical-rating_DESC"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najwyższe
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "numerical-rating_ASC";
                  handleSearchParams(option);
                }}
                style={
                  searchParams.get("sortBy") === "numerical-rating_ASC"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najniższe
              </div>
            </div>
          </div>
        </div>
        <div className="user-page__filters">
          <div

          >
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default MusicAlbums;

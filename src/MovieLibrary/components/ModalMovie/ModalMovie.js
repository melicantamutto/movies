import React from "react";
import { useDispatch } from "react-redux";
import { eraseMovieModal } from "../../store/actions";
import { Col, Row, Modal } from "antd";
import "./ModalMovie.sass";
import moment from "moment";
import { POSTER_URL, BACKDROP_URL } from "../../utils/utils";

export default function MovieLibrary({ movie }) {
  const {
    title,
    original_title,
    poster_path,
    overview,
    vote_average,
    vote_count,
    release_date,
    backdrop_path,
    original_language,
  } = movie;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(eraseMovieModal());
  };

  return (
    <Modal
      title={title}
      centered
      visible={true}
      onCancel={handleClose}
      footer={null}
      width={"90%"}
    >
      <div
        className="movie"
        style={{ backgroundImage: `url('${BACKDROP_URL + backdrop_path}')` }}
      >
        <Row className="movie__dark">
          <Col xs={18} sm={18} md={8} offset={3} className="movie__poster">
            <div
              style={{ backgroundImage: `url('${POSTER_URL + poster_path}')` }}
            ></div>
          </Col>
          <Col xs={24} sm={12} md={10} className="movie__info">
            <div>
              <h1 className="info__mainTitle">
                {title}
                <span> ~ {original_language.toUpperCase()}</span>
              </h1>
            </div>
            <div>
              <h2 className="info__subTitle">
                {moment(release_date, "YYYY-MM-DD").format("MMM D YYYY")}
              </h2>
              <p className="info__description">
                Original title: {original_title}
              </p>
              <h3 className="info__subTitle">Overview</h3>
              <p className="info__description">{overview}</p>
              <h3 className="info__subTitle">Score</h3>
              <p className="info__score">
                <span className="info__score__number">{vote_average}</span>{" "}
                among {vote_count} voters
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

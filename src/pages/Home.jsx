import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const {
    apartments: { apartments },
  } = useSelector((state) => state);

  const getVoteClass = (vote) => {
    if (vote >= 15000) {
      return "red";
    } else if (vote >= 7000) {
      return "orange";
    } else {
      return "green";
    }
  };

  return (
    <>
      <div className="col-md-7 col-lg-6  container  mt-4 ">
        <div className="row rounded-2 overflow-hidden border w-75 mx-auto p-1">
          <div>
            <div className="fs-2 text-center">Fearless Reservations</div>
            <div className="row p-1">
              <div className="col-6 p-0 text-center side-line">
                <div className=" my-1 p-md-3 p-1 rounded-4 ">
                  <div>
                    <i className="fa-solid fa-building fa-2xl m-4"></i>
                  </div>
                  <div className="fs-4">Apartment</div>
                </div>
              </div>
              <div className="col-6 p-0 text-center side-line">
                <div className="my-1 p-md-3 p-1 rounded-4">
                  <div>
                    <i className="fa-solid fa-utensils fa-2xl m-4"></i>
                  </div>
                  <div className="fs-4">Restaurant</div>
                </div>
              </div>
              <div className="col-6 p-0 text-center side-line">
                <div className="my-1 p-md-3 p-1 rounded-4">
                  <div>
                    <i className="fa-solid fa-car-side fa-2xl m-4"></i>
                  </div>
                  <div className="fs-4">Car</div>
                </div>
              </div>
              <div className="col-6 p-0 text-center side-line">
                <div className="my-1 p-md-3 p-1  rounded-4">
                  <div>
                    <i className="fa-solid fa-hotel fa-2xl m-4"></i>
                  </div>
                  <div className="fs-4">Hotel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-lg-6  container  my-4 ">
        <div className="row rounded-2 overflow-hidden border w-75 mx-auto p-1">
          <div className="text-center fw-bold fs-5">Newest Houses</div>
          {apartments.slice(0, 5).map((rate, i) => (
            <div
              key={i}
              className="d-flex p-1 gap-2 align-items-center justify-content-between side-line "
            >
              <div className=" d-flex p-1 gap-1 align-items-center">
                <div>{i + 1})</div>
                <div>
                  <img
                    src={rate?.img}
                    width="90px"
                    height="60px"
                    alt="homeimage"
                    className="rounded object-fit-cover d-none d-sm-block"
                  />
                </div>
                <div className="px-1">{rate.title}</div>
              </div>

              <div className="">
                <div className="fs-6">
                  <span className={`tag ${getVoteClass(rate.price)}`}>
                    {rate.price} $
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Home;

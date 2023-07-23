import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";


import StarRateIcon from "@mui/icons-material/StarRate";
import ImageViewer from "react-simple-image-viewer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductDetails() {
  const location = useLocation();

  const [apiCall, setApiCall] = useState([location.state.main_image]);

  useEffect(() => {
    console.log(location, "location");

    // if (location.state.main_image !== "") {
    //   console.log(location.state.main_image, "m1");
    //   setApiCall((apiCall) => [...apiCall, location.state.main_image]);
    // }
    if (location.state.display_image1 !== "") {
      console.log(location.state.display_image1, "d1");
      setApiCall((apiCall) => [...apiCall, location.state.display_image1]);
    }
    if (location.state.display_image2 !== "") {
      console.log(location.state.display_image1, "d2");
      setApiCall((apiCall) => [...apiCall, location.state.display_image2]);
    }
    if (location.state.display_image3 !== "") {
      console.log(location.state.display_image1, "d3");
      setApiCall((apiCall) => [...apiCall, location.state.display_image3]);
    }
    if (location.state.display_image4 !== "") {
      console.log(location.state.display_image1, "d4");
      setApiCall((apiCall) => [...apiCall, location.state.display_image4]);
    }
  }, []);

  const [slider, setSlider] = useState(apiCall[0]);
  const handle = (e) => {
    const result = apiCall[e];
    setCurrentImage(e);
    setSlider(result);
  };
  const [count, setCount] = useState(1);

  let incrementCount = () => {
    setCount(count + 1);
  };

  let decrementCount = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };
  let handleChange = (e) => {
    setCount(e.target.value);
  };

  const [cart, setCart] = useState(1);
  const Kart = () => {
    setCart(cart + 1);
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div
      className="main-container"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="app"
        style={{
          textAlign: "center",
          marginTop: "30px",
          border: "10px solid bisque",
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <img
              src={slider}
              width="585px"
              height="400px"
              onClick={() => openImageViewer()}
            />
            {isViewerOpen && (
              <ImageViewer
                src={apiCall}
                currentIndex={currentImage}
                disableScroll={false}
                closeOnClickOutside={true}
                onClose={closeImageViewer}
              />
            )}

            <div
              className="flex-row"
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "20px",
              }}
            >
              {apiCall.map((item, index) => (
                <div
                  className="tumbnail"
                  style={{ paddingLeft: "20px" }}
                  key={item}
                >
                  <img
                    className={currentImage == index ? "clicked" : ""}
                    src={item}
                    onClick={() => handle(index)}
                    height="70px"
                    width="100px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="description">
              <div
                style={{
                  float: "right",
                  float: "right",
                  display: "flex",
                }}
              >
                {/* <ShoppingCartIcon></ShoppingCartIcon> */}
                <p>{cart}</p>
              </div>
            </div>
            <div style={{ textAlign: "left", paddingLeft: "20%" }}>
              <h3 style={{ color: "grey" }}>{location.state.product_name}</h3>
              <br />
              <h4>
                ₹{location.state.price}
    
              </h4>
              <br />
              <span
                style={{
                  backgroundColor: "green",
                  padding: "10px",
                  borderRadius: "30px",
                  color: "white",
                  margin:"5px"
                }}
              >
                3.8
                <StarRateIcon fontSize="small" />
              </span>
              <br /> <br /> <br />
              <br />
            </div>
            <div style={{ textAlign: "left", paddingLeft: "20%" }} >
              <h4>Size: {location.state.size}</h4>
              <br /> <br /> <br />
            </div>
            <div style={{ textAlign: "left", paddingLeft: "20%" }}>
              <h4>Product Details: </h4>
              <p>{location.state.description}</p>
              <br />
              <br />
            </div>
            <div style={{ display: "flex",textAlign: "left", paddingLeft: "20%"  }}>
              <button
                type="button"
                style={{ width: "39px", height: "39px", borderRadius: 0 }}
                className="btn btn-outline-primary"
                onClick={decrementCount}
              >
                -
              </button>
              <input
                type="text"
                className="form-control"
                defaultValue={1}
                min={1}
                style={{
                  width: "43px",
                  borderLeft: 0,
                  borderRight: 0,
                  borderTop: "1px solid blue",
                  borderBottom: "1px solid blue",
                  borderRadius: 0,
                  height: "39px",
                }}
                value={count}
                onChange={handleChange}
              />
              <button
                type="button"
                style={{ width: "39px", height: "39px", borderRadius: 0 }}
                className="btn btn-outline-primary"
                onClick={incrementCount}
              >
                +
              </button>

              <br />
              <br />
              <button
                type="button"
                class="btn btn-danger"
                style={{
                  padding: "7px",
                  marginLeft: "10px",
               
                }}
                onClick={Kart}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import React from "react";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  cart.map((p) => {
    if (p.id === prod.id) {
      const num = cart.reduce((acc, curr) => acc + curr.qty, 0);
    }
  });

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price.split(".")[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={prod.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <div>
              <Button
                variant="danger"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
              >
                Remove from Cart
              </Button>
              {cart.map((p) => {
                if (p.id === prod.id) {
                  return (
                    <React.Fragment key={p.id}>
                      <Button
                        variant="outline-primary"
                        style={{ marginLeft: 10 }}
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: p.id,
                              qty: p.qty - 1,
                            },
                          })
                        }
                        disabled={p.qty <= 1}
                      >
                        -
                      </Button>
                      <span className="mx-2">{p.qty}</span>
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: p.id,
                              qty: p.qty + 1,
                            },
                          })
                        }
                        disabled={p.qty >= p.inStock}
                      >
                        +
                      </Button>
                    </React.Fragment>
                  );
                }
                return null; 
              })}
            </div>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;

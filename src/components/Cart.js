import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Modal,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

 
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  // console.log(cart)

  const [showAlert, setShowAlert] = useState(false);

  const handleRemoveFromCart = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const removeItem = (prod) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: prod,
    });
    setShowAlert(false);
  };




  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: prod.id,
                            qty: prod.qty - 1,
                          },
                        })
                      }
                      disabled={prod.qty <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{prod.qty}</span>
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: prod.id,
                            qty: prod.qty + 1,
                          },
                        })
                      }
                      disabled={prod.qty >= prod.inStock}
                    >
                      +
                    </Button>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveFromCart(prod)}
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>

                  <Modal show={showAlert} onHide={handleCloseAlert}>
                    <Modal.Header closeButton>
                      <Modal.Title>Item Removed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Item will be removed from the cart.</Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={() => removeItem(prod)}>
                        Remove
                      </Button>
                      <Button variant="secondary" onClick={handleCloseAlert}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal Amount: </span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
      </div>
    </div>
  );
};

export default Cart;

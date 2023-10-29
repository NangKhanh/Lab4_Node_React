import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
const ProductCard = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Gửi yêu cầu GET đến URL cụ thể dựa trên `id`
    axios.get(`http://localhost:9999/products/${id}`)
      .then(response => setProducts(response.data.data))
      .catch(error => console.error(error));
  }, [id]);
  useEffect(() => {
    // Gửi yêu cầu GET đến URL cụ thể dựa trên `id`
    axios.get(`http://localhost:9999/products/${id}/comment`)
      .then(response => setComments(response.data.data))
      .catch(error => console.error(error));
  }, [id]);
  return (
    <Container>
      <Row>
        <Col md={4}>
          <img src={products.thumbnail} alt={products.name} style={{ maxWidth: '100%' }} />
        </Col>
        <Col md={8}>
          <h2>{products.name}</h2>
          <p>{products.description}</p>
          <p>Price: ${products.price}</p>
          <p>Discount: {products.discountPercentage}%</p>
          <p>Stock: {products.stock}</p>
          <p>Brand: {products.brand}</p>
        </Col>s
      </Row>
      <Row>
        <Col>
          <h3>Comments</h3>
          <input type='text' placeholder='Title' style={{ maxWidth: '5%' }}/>
          <input type='text' placeholder='Write your comment' style={{ maxWidth: '25%' }}/>
          <Button  variant="variant">Comment</Button>
          {comments.map(comment =>(
            <div key={comment._id}>
                <p>Title :{comment.title}</p>
                <p>{comment.user.username}: {comment.body}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCard;

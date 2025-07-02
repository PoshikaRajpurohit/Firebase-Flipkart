import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {getProductAsync,updateProductAsync} from "../Services/Action/ProductAction";
import { uploadImage } from "../Services/UploadImages";
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, isUpdated, errorMsg } = useSelector((state) => state.productReducer);
  const initialState = {
    id: "",
    title: "",
    desc: "",
    category: "",
    price: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState(''); 
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
     if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };
  const validateForm = () => {
    const { title, desc, category, price, image } = inputForm;
    const newErrors = {};
    if (!title) newErrors.title = "Product title is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category must be selected.";
    if (!price) newErrors.price = "Price is required.";
    else if (isNaN(price) || Number(price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!image) newErrors.image = "Image URL is required.";
    return newErrors;
  };
  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    setFileName(file.name);
    let image = await uploadImage(file);
    setInputForm({
      ...inputForm,
      image: `${image}`,
    });
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    dispatch(updateProductAsync({ ...inputForm, id }));
  };
  useEffect(() => {
    if (id) dispatch(getProductAsync(id));
  }, [id, dispatch]);
  useEffect(() => {
    if (product) setInputForm(product);
  }, [product]);
  useEffect(() => {
    if (isUpdated) {
      navigate("/"); 
    }
  }, [isUpdated, navigate]);
  return (
    <Container className="edit-container mt-5 p-4 shadow rounded bg-white" style={{ width: "700px" }}>
      <h2 className="text-primary fw-bold text-center mb-4">Edit Product</h2>
      <Form onSubmit={handleSubmit}>  
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Product Title" name="title" value={inputForm.title} onChange={handleChanged}/>
          {errors.title && <small className="text-danger">{errors.title}</small>}
        </Form.Group>   
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Product Description" name="desc" value={inputForm.desc} 
          onChange={handleChanged}/>
          {errors.desc && <small className="text-danger">{errors.desc}</small>}
        </Form.Group>   
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Price</Form.Label>
          <Form.Control type="number" placeholder="Enter Product Price" name="price" value={inputForm.price} onChange={handleChanged}/>
          {errors.price && <small className="text-danger">{errors.price}</small>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Form.Select name="category" value={inputForm.category} onChange={handleChanged}>
            <option value="">Select Category</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Laptops">Laptops</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Appliances">Appliances</option>
            <option value="Beauty">Beauty</option>
            <option value="Bags">Bags</option>
            <option value="Stationery">Stationery</option>
            <option value="Grocery">Grocery</option>
          </Form.Select>
          {errors.category && (<small className="text-danger">{errors.category}</small>)}
        </Form.Group>     
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Product Image URL</Form.Label>
          <Form.Control type="file" placeholder="Enter Image URL" name="image"  onChange={handleFileUpload}/>
          {inputForm.image && (
          <Form.Text className="text-muted">
          Current Image: <a href={inputForm.image} target="_blank" rel="noreferrer">{inputForm.image.split('/').pop()}</a>
          </Form.Text>
          )}
          {errors.image && <small className="text-danger">{errors.image}</small>}
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="px-5 py-2 rounded-pill fw-semibold">
            Update Product
          </Button>
        </div>
        {errorMsg && <p className="text-danger mt-3 text-center">{errorMsg}</p>}
      </Form>
    </Container>
  );
};
export default EditProduct;
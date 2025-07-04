import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Form } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router";
import { addNewProductAsync } from "../Services/Action/ProductAction";
import { uploadImage } from "../Services/UploadImages";
import { ToastContainer, toast } from "react-toastify";
const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreated, errorMsg } = useSelector((state) => state.productReducer);
  const { user } = useSelector(state => state.authReducer);
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
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      image: "",
      [name]: "",
    }));
  };
  const validateForm = () => {
    const { title, desc, category, price, image } = inputForm;
    const newErrors = {};
    if (!title) newErrors.title = "Product title is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category must be selected.";
    if (!price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (!image) newErrors.image = "Image URL is required.";
    return newErrors;
  };
  
  const handleFileUpload = async (e) => {
    try {
      const uploaded = await uploadImage(e.target.files[0]);
      setInputForm((prev) => ({
        ...prev,
        image: uploaded,
      }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors.");
      return;
    }
    const id = generateUniqueId({ length: 6, useLetters: false });
    const newProduct = { ...inputForm, id };
    dispatch(addNewProductAsync(newProduct));
  };

  useEffect(() => {
    if (isCreated) {
      setInputForm(initialState);
      setErrors({});
      toast.success("🎉 Product added successfully!");
      setTimeout(() => navigate("/"), 2500);
    }
  }, [isCreated, navigate]);
    useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Card className="add-product-card w-100" style={{ maxWidth: "600px" }}>
        <h3 className="text-center text-primary mb-4 fw-bold">Add a New Product</h3>
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
            {errors.category && <small className="text-danger">{errors.category}</small>}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Product Image </Form.Label>
            <Form.Control type="file" placeholder="Choose your file" name="image" onChange={handleFileUpload}/>
            {errors.image && <small className="text-danger">{errors.image}</small>}
          </Form.Group>
          
          <div className="text-center">
            <Button variant="primary" type="submit" className="px-5 py-2 rounded-pill fw-semibold">
              <span>Add Product</span>
            </Button>
          </div>
          {errorMsg && <p className="text-danger mt-3 text-center">{errorMsg}</p>}
        </Form>
      </Card>
    </Container>
  );
};
export default AddProduct;


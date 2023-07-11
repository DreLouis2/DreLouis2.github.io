import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Figure,
  Toast,
} from "react-bootstrap";
import bcrypt from 'bcryptjs'
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner, Post } from "components";
import { useProvideAuth } from "hooks/useAuth";
import { useRequireAuth } from "hooks/useRequireAuth";
import axios from "utils/axiosConfig.js";
import { toast } from "react-toastify";

const UserDetailPage = () => {
  const { state } = useProvideAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    password: "",
    oldPassword: "",
    confirmPassword: "",
    isSubmitting: false,
    errorMessage: null,
  });
  const [selectedImg, setSelectedImg] = useState(null)

  let imgs = [
    'bird.svg',
    'dog.svg',
    'fox.svg',
    'frog.svg',
    'lion.svg',
    'owl.svg',
    'tiger.svg',
    'whale.svg',
  ]

  let navigate = useNavigate();
  let params = useParams();
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await axios.get(`users/${params.uid}`);
        setUser(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uid, isAuthenticated]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    // handle invalid or empty form
    if (form.checkValidity() === false) {
      setValidated(true);
      console.error('Please enter valid password', 400)
      return;
    } else if(data.password.length < 8 || data.password.length > 20 ){
      setValidated(false);
      toast.error(`Error: Password must be 8-20 characters long. Current length: ${data.password.length}`, 400)
      return;
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      // write code to call edit user endpoint 'users/:id'
      const {
        user: { uid, username, password },
      } = state;
      setValidated(false);
      
      if((await bcrypt.compare(`${data.oldPassword}`, user.passwordHash)) !== true){
        toast.error(`Error: The old password entered is not correct.`)
        setData({
          ...data,
          isSubmitting: false 
        })
        return
      } else if (data.confirmPassword !== data.password){
        toast.error(`Error: Your new password must match its confirmation.`)
        console.error('Error: Your new password must match its confirmation.')
        setData({
          ...data,
          isSubmitting: false 
        })
        return
      }
        

      //changing password only
      if (selectedImg === null) {axios
        .put(`/users/${uid}`, {
          password: `${data.password}`,
          profile_image: user.profile_image
        })
        setLoading(false)
        setData({
          ...data,
          isSubmitting: false
        })
        toast.success('Success: Password Updated')
        setTimeout(window.location.reload(), 3000)
      } 
      //changing password and profile picture
      else {
        axios
        .put(`/users/${uid}`, {
          password: `${data.password}`,
          profile_image: `/${selectedImg}`
        })
        setLoading(false)
        setData({
          ...data,
          isSubmitting: false
        })
        toast.success('Success: Password & Profile Image Updated')
        setTimeout(window.location.reload(), 3000)
      }
      // don't forget to update loading state and alert success
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
    }
  };

  if (!isAuthenticated) {
    return <LoadingSpinner full />;
  }

  if (loading) {
    return <LoadingSpinner full />;
  }

  return (
    <>
      <Container className="clearfix">
        <Button
          variant="outline-info"
          onClick={() => {
            navigate(-1);
          }}
          style={{ border: "none", color: "#E5E1DF" }}
          className="mt-3 mb-3"
        >
          Go Back
        </Button>
        <Card bg="header" className="text-center">
          <Card.Body>
            <Figure
              className="bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1"
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: "white",
              }}
            >
              <Figure.Image src={user.profile_image} className="w-100 h-100" />
            </Figure>
            <Card.Title>{params.uid}</Card.Title>
            <Card.Text>{user.email}</Card.Text>
            {state.user.username === params.uid && (
              <div
                onClick={() => setOpen(!open)}
                style={{ cursor: "pointer", color: "#BFBFBF" }}
              >
                Edit User
              </div>
            )}
            {open && (
              <Container animation="false">
                <div className="row justify-content-center p-4">
                  <div className="col text-center">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleUpdatePassword}
                    >
                      <Form.Group>
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="oldPassword"
                          required
                          value={data.oldPassword}
                          onChange={handleInputChange}
                        />
                        <Form.Label htmlFor="password">New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          required
                          value={data.password}
                          onChange={handleInputChange}
                        />
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          required
                          value={data.confirmPassword}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          New Password is required
                        </Form.Control.Feedback>
                        <Form.Text id="passwordHelpBlock" muted>
                          Must be 8-20 characters long.
                        </Form.Text>
                    <br/>
                  <Form.Label>Choose a New Avatar</Form.Label> 
                  <div align="center">
                  {imgs.map((img) => {
                  
                  return <Figure key={img}
                  className="bg-border-primary rounded-circle my-2 ml-2 mx-1 p-2"
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: "white",
                  }}
                >
                  <Figure.Image 
                  onClick={(e)=> {
                    setSelectedImg(img)
                  }} 
                  className='class="w-100 h-100 figure-img img-fluid"' 
                  src={`/${img}`} />
                </Figure>
                  })}
                  </div>
                  <br/>
                {selectedImg?
                <div>
                <Form.Label>Selected Avatar</Form.Label>
                <Figure.Image
                className='class="w-100 h-100 figure-img img-fluid"' 
                src={`/${selectedImg}`} />
                </div>
                    :
                <p></p>
                }
                      </Form.Group>

                      {data.errorMessage && (
                        <span className="form-error">{data.errorMessage}</span>
                      )}
                      <Button type="submit" disabled={data.isSubmitting}>
                        {data.isSubmitting ? <LoadingSpinner /> : "Update"}
                      </Button>
                    </Form>
                  </div>
                </div>
              </Container>
              
            )}
          </Card.Body>
        </Card>
      </Container>
      <Container className="pt-3 pb-3">
        {user.posts.length !== 0 ? (
          user.posts.map((post) => (
            <Post key={post._id} post={post} userDetail />
          ))
        ) : (
          <div
            style={{
              marginTop: "75px",
              textAlign: "center",
            }}
          >
            No User Posts
          </div>
        )}
      </Container>
    </>
  );
};

export default UserDetailPage;

import { Email, Lock, Login, Person } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { httpService } from "../../httpService";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Nav } from "react-bootstrap";

function RegisterPage() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await httpService.post("auth/signup", userData);

    if (data) {
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }

    setLoading(false);
  };
  return (
    <div>
      <div className="mt-5 container ">
        <Typography variant="h6" className="mb-4">
          Create JAMB TEST Account
        </Typography>

        <div className="col-lg-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                required
                variant="outlined"
                onChange={handleChange}
                slotProps={{
                  input: { startAdornment: <Person sx={{ mr: 1 }} /> },
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Email"
                required
                name="email"
                variant="outlined"
                onChange={handleChange}
                slotProps={{
                  input: { startAdornment: <Email sx={{ mr: 1 }} /> },
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                required
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                error={error}
                onChange={handleChange}
                slotProps={{
                  input: { startAdornment: <Lock sx={{ mr: 1 }} /> },
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                required
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                type="password"
                error={error}
                helperText={error ? "Password does not match" : ""}
                onBlur={(e) => setError(e.target.value !== userData.password)}
                slotProps={{
                  input: { startAdornment: <Lock sx={{ mr: 1 }} /> },
                }}
              />
            </div>
            <div>
              <Button
                disabled={error}
                variant="contained"
                type="submit"
                loading={loading}
                loadingPosition="end"
                endIcon={<Login />}
              >
                Create account
              </Button>
            </div>
            <Nav.Link as={Link} to="/" className="mt-3">
              Already have an account? Login
            </Nav.Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

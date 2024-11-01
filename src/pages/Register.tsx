import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { User } from "../types/user";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.get<User[]>("http://localhost:8000/users");

        const existingUser = data.find((user) => user.email === values.email);

        if (existingUser) {
          return toast.error("Email already exist");
        }

        await axios.post("http://localhost:8000/users", values);
        navigate("/");
        toast.success("Register success");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="container mx-auto px-4 mt-20">
      <Card className="max-w-sm mx-auto">
        <h1 className="text-center font-bold text-3xl">Page Register</h1>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Name"
              required
              color={
                formik.touched.name && formik.errors.name
                  ? "failure"
                  : undefined
              }
              helperText={
                <span className="font-medium">
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null}
                </span>
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              placeholder="name@flowbite.com"
              color={
                formik.touched.email && formik.errors.email
                  ? "failure"
                  : undefined
              }
              helperText={
                <span className="font-medium">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null}
                </span>
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <div className="relative">
              <TextInput
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showPassword ? "text" : "password"}
                color={
                  formik.touched.password && formik.errors.password
                    ? "failure"
                    : undefined
                }
                helperText={
                  <span className="font-medium">
                    {formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : null}
                  </span>
                }
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;

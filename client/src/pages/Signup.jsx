import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/makeRequest";

function Signup() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/auth/signup", form);

        if (res.status === 201) {
          const data = res.data;

          setError("");
          setForm({ fullName: "", email: "", password: "" });

          return data;
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = () => {
    if (!form.email || !form.fullName || !form.password) {
      setError("Please fill in all the required fields!");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be longer than 7 characters!");
      return;
    }

    setError("");
    signup();
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  return (
    <section>
      <div className="p-4 bg-gray-100 w-full sticky top-0">
        <h1 className="text-xl font-semibold">
          <Link to={"/"}>
            Job <span className="text-primary">Sphere</span>
          </Link>
        </h1>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Unlock Your Potential with JobSphere - Empowering Your Career
            Journey. With JobSphere, your dream job is just a click away -
            create your future today!
          </p>
        </div>

        <form
          className="mx-auto mb-0 mt-8 max-w-md space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <div>
            <label htmlFor="name" className="sr-only">
              Full name
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg outline-none border-gray-200 p-4 h-12 shadow-sm bg-gray-100"
                placeholder="Your full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg outline-none border-gray-200 p-4 h-12 shadow-sm bg-gray-100"
                placeholder="Your email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg outline-none border-gray-200 p-4 h-12 shadow-sm bg-gray-100"
                placeholder="Your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-block rounded-lg bg-primary px-5 py-3 text-base w-full font-medium text-white"
          >
            {isLoading ? "Signing up" : "Sign up"}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-5 mx-auto max-w-md">
          Already have an account | &nbsp;
          <Link className="underline" to="/signin">
            Sign in!
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;

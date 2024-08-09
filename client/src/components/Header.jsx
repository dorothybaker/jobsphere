import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { API } from "../utils/makeRequest";

function Header() {
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const queryClient = useQueryClient();
  const { mutate: signout, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/auth/signout", {});

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      window.location.reload();
    },
  });

  return (
    <header className="sticky top-0 bg-gray-100 z-[999]">
      <div className="p-4 w-full flex justify-between items-center max-w-7xl mx-auto">
        <h1>
          <Link to={"/"} className="sm:text-2xl text-xl font-semibold">
            Job <span className="text-primary">Sphere</span>
          </Link>
        </h1>

        <ul className="flex items-center sm:gap-4 gap-3 *:text-lg *:font-medium *:cursor-pointer">
          <li>
            {user ? (
              <span
                onClick={() => {
                  signout();
                }}
                aria-disabled={isLoading}
              >
                Sign out
              </span>
            ) : (
              <Link to={"/signin"}>Sign in</Link>
            )}
          </li>
          <li>
            <Link
              to={user ? "/new-listing" : "/signin"}
              className="text-primary"
            >
              Post a job
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;

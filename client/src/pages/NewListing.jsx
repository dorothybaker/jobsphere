import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { API } from "../utils/makeRequest";
import { Link } from "react-router-dom";

function NewListing() {
  const [name, setName] = useState("");

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      try {
        const res = await API.get("/companies/companies");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const queryClient = useQueryClient();
  const { mutate: createCompany, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/companies/create", { name });

        if (res.status === 201) {
          const data = res.data;

          setName("");
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  return (
    <section className="py-10 flex flex-col space-y-7">
      <div className="flex flex-col gap-y-3">
        <div>
          <h2 className="text-lg font-semibold">Create a new company</h2>
          <span className="text-sm text-slate-500">
            To create a new job listing, you first need to create a company.
          </span>
        </div>

        <form
          className="flex sm:flex-row gap-2 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            createCompany();
          }}
        >
          <input
            type="text"
            placeholder="Company name"
            className="h-12 w-full max-w-xl px-4 bg-gray-100 outline-none rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-gray-200 h-12 px-4 rounded-lg"
            type="submit"
            disabled={isPending}
          >
            <span>Create company</span>
          </button>
        </form>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Your companies</h2>
          <span className="text-sm text-slate-500">
            Select a company, to proceed creating the job.
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          {isLoading &&
            [1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-gray-100 h-11 max-w-xs w-full rounded-lg"
              />
            ))}
          {!isLoading && companies?.length === 0 && (
            <p className="text-slate-400">You don't have any companies yet!</p>
          )}
          {!isLoading &&
            companies &&
            companies?.map((company) => (
              <Link
                key={company._id}
                className="bg-gray-50 h-11 flex items-center justify-start px-5 space-x-2 rounded-lg w-max cursor-pointer"
                to={`/new-listing/${company._id}`}
              >
                <span className="line-clamp-1">{company.name}</span>
                <div className="mb-0.5">
                  <IoArrowForwardOutline size={13} />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default NewListing;

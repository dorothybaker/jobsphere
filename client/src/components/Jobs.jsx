import { useQuery } from "@tanstack/react-query";
import Job from "./Job";
import { API } from "../utils/makeRequest";

function Jobs({ search }) {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["allJobs"],
    queryFn: async () => {
      try {
        const res = await API.get("/jobs/");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="flex flex-col gap-y-3 mb-10 max-w-3xl w-full mx-auto">
      <h2 className="text-lg font-semibold">Recent jobs</h2>
      <div className="flex flex-col gap-y-4">
        {isLoading &&
          [1, 2, 3, 4].map((idx) => (
            <div className="bg-gray-100 rounded-lg w-full h-24" key={idx} />
          ))}

        {!isLoading &&
        jobs.filter((job) =>
          job.title.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          jobs
            .filter((job) =>
              job.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((job) => <Job key={job._id} job={job} />)
        ) : (
          <div className="min-h-[200px] flex w-full items-center text-start">
            <span className="text-2xl text-slate-400">
              No jobs found for your search query!
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Jobs;

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { API } from "../utils/makeRequest";
import { useNavigate, useParams } from "react-router-dom";

function Job() {
  const { id } = useParams();

  const remote = {
    onsite: "On-site",
    hybrid: "Hybrid-remote",
    remote: "Fully-remote",
  };

  const jobTime = {
    full: "Full-time",
    part: "Part-time",
    project: "Project-based",
  };

  const experience = {
    0: "No experience",
    1: "1 - 5 years experience",
    2: "More than 5 years experience",
  };

  const { data: job, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      try {
        const res = await API.get(`/jobs/${id}`);

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  //   const { data: user } = useQuery({ queryKey: ["authUser"] });
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex flex-col space-y-4 py-7">
        <div className="bg-gray-100 rounded-lg w-full h-10" />
        <div className="bg-gray-100 rounded-lg w-full h-20" />
        <div className="bg-gray-100 rounded-lg w-full h-7" />
        <div className="bg-gray-100 rounded-lg w-full h-[200px]" />
        <div className="bg-gray-100 rounded-lg w-full h-[300px]" />
      </div>
    );

  return (
    <section className="w-full py-7 flex flex-col space-y-3">
      <div className="flex items-center gap-x-2">
        <div>
          <img src={job?.companyIcon} alt="" className="size-7" />
        </div>
        <span className="text-lg font-semibold text-gray-500">
          {job?.companyId.name}
        </span>
      </div>

      <h1 className="text-3xl font-semibold">{job?.title}</h1>

      <h3 className="text-base text-primary">
        {remote[job?.arrangement]} &middot; {job?.city} &middot; {job?.state},{" "}
        {job?.country} &middot; {jobTime[job?.fullTime]} &middot;{" "}
        {experience[job?.experience]} &middot;{" "}
        {/* {user?._id === job.owner._id && (
          <span className="text-green-500" onClick={() => navigate(`/jobs/edit/${job._id}`)}>Edit</span>
        )}
        &middot;{" "} */}
        {/* {user?._id === job.owner._id && (
          <span className="text-red-500">Delete</span>
        )} */}
      </h3>

      <h4 className="text-xl">${job?.salary.toLocaleString()} per year</h4>

      <div className="whitespace-pre-line text-slate-800 leading-7">
        {job?.description}
      </div>

      <div>
        <h6>Contact person</h6>
        <div className="flex gap-x-3 items-center">
          <img
            src={job.contactPhoto}
            alt=""
            className="size-16 rounded-full object-cover"
          />
          <div className="flex flex-col *:cursor-pointer *:line-clamp-1 *:text-slate-600">
            <span>{job.contactName}</span>
            <span>{job.contactPhone}</span>
            <span>{job.contactEmail}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Job;

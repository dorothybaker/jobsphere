// import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-timeago";

function Job({ job }) {
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

  // const { data: user } = useQuery({ queryKey: ["authUser"] });
  // const navigate = useNavigate();

  return (
    <Link
      to={`/jobs/${job._id}`}
      className="bg-secondary w-full p-4 shadow-sm rounded-lg flex items-center gap-x-4"
    >
      <div>
        <div>
          <img src={job.companyIcon} alt="" className="size-12" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-x-3 flex-1 w-full">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 line-clamp-1">
            {job.companyId.name}{" "}
            <span className="inline-block sm:hidden">&nbsp; | &nbsp; </span>
            <span className="text-slate-500 inline-block sm:hidden">
              <ReactTimeAgo date={job.createdAt} />
            </span>
          </p>
          <h2 className="font-semibold text-lg line-clamp-1">{job.title}</h2>
          <h3 className="text-sm line-clamp-1 text-slate-600">
            {remote[job.arrangement]} &middot; {job.city} &middot; {job.state},{" "}
            {job.country} &middot; {jobTime[job.fullTime]} &middot;{" "}
            {/* {user?._id === job.owner._id && (
              <span
                className="text-green-500"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/jobs/edit/${job._id}`);
                }}
              >
                Edit
              </span>
            )}
            &middot;{" "} */}
            {/* {user?._id === job.owner._id && (
              <span className="text-red-500">Delete</span>
            )} */}
          </h3>
        </div>
        <span className="text-slate-400 sm:block hidden text-sm line-clamp-1">
          <ReactTimeAgo date={job.createdAt} />
        </span>
      </div>
    </Link>
  );
}

export default Job;

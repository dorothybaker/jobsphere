import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";

import { IoPersonOutline, IoStarOutline } from "react-icons/io5";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";
import UploadPhoto from "../components/UploadPhoto";

function NewCompanyListing() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  const [form, setForm] = useState({
    title: "",
    arrangement: "hybrid",
    fullTime: "full",
    experience: 0,
    salary: null,
    country: "",
    state: "",
    city: "",
    companyIcon: null,
    contactPhoto: null,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    description: "",
  });

  const [error, setError] = useState("");

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const navigate = useNavigate();

  const { mutate: createJob, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post(`/jobs/create/${id}`, form);

        if (res.status === 201) {
          const data = res.data;

          setForm({
            title: "",
            arrangement: "hybrid",
            fullTime: "full",
            experience: 0,
            salary: null,
            country: "",
            state: "",
            city: "",
            companyIcon: null,
            contactPhoto: null,
            contactName: "",
            contactPhone: "",
            contactEmail: "",
            description: "",
          });
          setError("");

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const requiredFields = [
    "title",
    "description",
    "country",
    "state",
    "city",
    "contactName",
    "contactPhone",
    "contactEmail",
  ];

  function checkFormFields(form, requiredFields) {
    for (const field of requiredFields) {
      if (!form[field]) {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = () => {
    if (!checkFormFields(form, requiredFields)) {
      setError("Some required fields are missing or invalid.");
      return;
    }

    setError("");
    createJob();
  };

  return (
    <form
      className="py-10 flex flex-col space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {error && <span className="text-sm text-red-500">{error}</span>}
      <div className="flex sm:flex-row flex-col sm:items-center gap-5">
        <div className="w-full flex-1">
          <input
            type="text"
            placeholder="Job title"
            className="h-12 bg-gray-200 outline-none w-full rounded-lg px-4"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="w-full flex-1">
          <div className="h-12 bg-gray-200 items-center flex gap-x-2.5 px-4 rounded-lg w-full flex-1">
            <span className="text-slate-500">$</span>
            <input
              type="number"
              placeholder="Salary"
              className="outline-none w-full bg-transparent"
              value={form.salary}
              min={100}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />
            <span className="text-slate-500">k/year</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-5 justify-between max-w-3xl">
        <div className="flex flex-col gap-y-1">
          <h3>Arrangement</h3>
          <div className="flex flex-col gap-y-2">
            <div>
              <label
                htmlFor="onsite"
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.arrangement === "onsite"
                        ? "bg-primary"
                        : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">On-site</p>
              </label>
              <input
                type="radio"
                name="onsite"
                id="onsite"
                className="hidden"
                onChange={() => setForm({ ...form, arrangement: "onsite" })}
              />
            </div>
            <div>
              <label
                htmlFor="hybrid"
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.arrangement === "hybrid"
                        ? "bg-primary"
                        : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">Hybrid-remote</p>
              </label>
              <input
                type="radio"
                name="hybrid"
                id="hybrid"
                className="hidden"
                onChange={() => setForm({ ...form, arrangement: "hybrid" })}
              />
            </div>
            <div>
              <label
                htmlFor="remote"
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.arrangement === "remote"
                        ? "bg-primary"
                        : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">Fully remote</p>
              </label>
              <input
                type="radio"
                name="remote"
                id="remote"
                className="hidden"
                onChange={() => setForm({ ...form, arrangement: "remote" })}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h3>Full time</h3>
          <div className="flex flex-col gap-y-2">
            <div>
              <label
                htmlFor="part"
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.fullTime === "part" ? "bg-primary" : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">Part-time</p>
              </label>
              <input
                type="radio"
                name="part"
                id="part"
                className="hidden"
                onChange={() => setForm({ ...form, fullTime: "part" })}
              />
            </div>
            <div>
              <label
                htmlFor="full"
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.fullTime === "full" ? "bg-primary" : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">Full-time</p>
              </label>
              <input
                type="radio"
                name="full"
                id="full"
                className="hidden"
                onChange={() => setForm({ ...form, fullTime: "full" })}
              />
            </div>
            <div>
              <label
                htmlFor="project"
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.fullTime === "project" ? "bg-primary" : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">Project based</p>
              </label>
              <input
                type="radio"
                name="project"
                id="project"
                className="hidden"
                onChange={() => setForm({ ...form, fullTime: "project" })}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <h3>Experience</h3>
          <div className="flex flex-col gap-y-2">
            <div>
              <label
                htmlFor={0}
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.experience === 0 ? "bg-primary" : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">No experience</p>
              </label>
              <input
                type="radio"
                name={0}
                id={0}
                className="hidden"
                onChange={() => setForm({ ...form, experience: 0 })}
              />
            </div>
            <div>
              <label
                htmlFor={1}
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.experience === 1 ? "bg-primary" : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">1 - 5 years experience</p>
              </label>
              <input
                type="radio"
                name={1}
                id={1}
                className="hidden"
                onChange={() => setForm({ ...form, experience: 1 })}
              />
            </div>
            <div>
              <label
                htmlFor={2}
                className="flex items-center gap-x-1.5 cursor-pointer"
              >
                <div className="rounded-full border border-gray-200 p-[3px]">
                  <div
                    className={`${
                      form.experience === 2 ? "bg-primary" : "bg-gray-50"
                    } size-3 rounded-full`}
                  />
                </div>
                <p className="text-sm">More than 5 years experience</p>
              </label>
              <input
                type="radio"
                name={2}
                id={2}
                className="hidden"
                onChange={() => setForm({ ...form, experience: 2 })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col gap-5 items-center">
        <div className="flex flex-1 w-full flex-col space-y-0.5">
          <h6>Country</h6>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setForm({ ...form, country: e.name });
            }}
            placeHolder="Select Country"
          />
        </div>
        <div className="flex flex-1 w-full flex-col space-y-0.5">
          <h6>State</h6>
          <StateSelect
            countryid={countryid}
            onChange={(e) => {
              setstateid(e.id);
              setForm({ ...form, state: e.name });
            }}
            placeHolder="Select State"
          />
        </div>
        <div className="flex flex-1 w-full flex-col space-y-0.5">
          <h6>City</h6>
          <CitySelect
            countryid={countryid}
            stateid={stateid}
            onChange={(e) => {
              setForm({ ...form, city: e.name });
            }}
            placeHolder="Select City"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
        <div className="flex col-span-1 flex-col space-y-1">
          <h6>Company icon</h6>
          {form.companyIcon ? (
            <img
              src={form.companyIcon}
              className="size-24 rounded-full object-cover"
            />
          ) : (
            <div className="bg-gray-100 size-24 rounded-full flex items-center justify-center">
              <IoStarOutline size={20} className="text-slate-600" />
            </div>
          )}
          <UploadImage setForm={setForm} form={form} name={"companyIcon"} />
        </div>
        <div className="flex items-center gap-5 w-full col-span-2">
          <div className="flex flex-col space-y-1">
            <h6>Contact person</h6>
            {form.contactPhoto ? (
              <img
                src={form.contactPhoto}
                className="size-24 rounded-full object-cover"
              />
            ) : (
              <div className="bg-gray-100 size-24 rounded-full flex items-center justify-center">
                <IoPersonOutline size={20} className="text-slate-600" />
              </div>
            )}
            <UploadPhoto setForm={setForm} form={form} name={"contactPhoto"} />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <input
              type="text"
              placeholder="Contact name"
              className="h-12 bg-gray-200 outline-none w-full rounded-lg px-4"
              value={form.contactName}
              onChange={(e) =>
                setForm({ ...form, contactName: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="Contact phone"
              className="h-12 bg-gray-200 outline-none w-full rounded-lg px-4"
              value={form.contactPhone}
              onChange={(e) =>
                setForm({ ...form, contactPhone: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Contact email"
              className="h-12 bg-gray-200 outline-none w-full rounded-lg px-4"
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <textarea
        className="min-h-[200px] w-full outline-none p-4 bg-gray-200 rounded-lg"
        placeholder="Job description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      ></textarea>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="max-w-sm mx-auto w-full bg-primary text-white h-12 flex items-center rounded-lg justify-center mt-5"
        >
          {isPending ? "Creating new job" : "Create new job"}
        </button>
      </div>
    </form>
  );
}

export default NewCompanyListing;

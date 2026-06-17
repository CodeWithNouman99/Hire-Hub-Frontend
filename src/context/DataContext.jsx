import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const fetchAllJobs = async (query = "developer jobs in pakistan") => {
  console.log("API function called:", query);

  setLoading(true);
  setError("");

  try {
    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search-v2",
      {
        params: {
          query: query,
          num_pages: "3",
          country: "pk",
          date_posted: "all",
        },
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      }
    );

    console.log("Full API Response:", response.data);

    const apiJobs =
      response.data?.data?.jobs ||
      response.data?.data ||
      [];

    console.log("Jobs Array:", apiJobs);

    if (Array.isArray(apiJobs)) {
      setJobs(apiJobs);
    } else {
      setJobs([]);
      setError("Jobs array nahi mili. Console me API response check karo.");
    }
  } catch (error) {
    console.log("API Error:", error);
    setError("API error. RapidAPI subscription/key check karo.");
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <DataContext.Provider value={{ jobs, loading, error, fetchAllJobs }}>
      {children}
    </DataContext.Provider>
  );
};

//This is the custom Hook
export const getData = ()=> useContext(DataContext)
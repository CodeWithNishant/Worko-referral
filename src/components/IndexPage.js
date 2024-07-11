import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import axios from "axios";
import ListCard from "./ListCard";
import "../styles.css";

const IndexPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (query) => {
    console.log("Searching for:", query);

    const filteredRef = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.username.toLowerCase().includes(query.toLowerCase()) ||
        company.address.toLowerCase().includes(query.toLowerCase()) ||
        company.email.toLowerCase().includes(query.toLowerCase()) ||
        company.birthday.includes(query)
    );
    setFilteredCompanies(filteredRef);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const fetchMultipleEntries = async (count) => {
    const requests = [];
    for (let i = 0; i < count; i++) {
      requests.push(
        axios.get("https://api.api-ninjas.com/v1/randomuser", {
          headers: {
            "X-Api-Key": "m4T2oiZy7DtFI1UITMtltA==mR89O2ART4KKyn6s",
          },
        })
      );
    }
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  };
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await fetchMultipleEntries(5);
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (error) {
        console.error(
          "Error fetching companies:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to Worko</h1>
        <button onClick={handleLoginClick}>Login</button>
      </div>
      <SearchComponent
        placeholder="Search company by name or industry"
        onSearch={handleSearch}
      />
      <ListCard title="Companies" items={filteredCompanies} />
    </div>
  );
};

export default IndexPage;

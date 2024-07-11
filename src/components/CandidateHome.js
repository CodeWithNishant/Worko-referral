import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchComponent from "./SearchComponent";
import ListCard from "./ListCard";
import "../styles.css";

const CandidateHome = ({ onLogout }) => {
  const [referrals, setReferrals] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const navigate = useNavigate();

  const fetchMultipleEntries = async (count) => {
    const requests = [];
    for (let i = 0; i < count; i++) {
      requests.push(
        axios.get("https://api.api-ninjas.com/v1/randomuser", {
          headers: {
            "X-Api-Key": "API-KEY-HERE",
          },
        })
      );
    }
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  };
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const data = await fetchMultipleEntries(5);
        setReferrals(data);
        setFilteredReferrals(data);
      } catch (error) {
        console.error(
          "Error fetching referrals:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchReferrals();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchMultipleEntries(5);
        setServices(data);
        setFilteredServices(data);
      } catch (error) {
        console.error(
          "Error fetching services:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchServices();
  }, []);

  const handleSearch = (query) => {
    console.log("Searching for:", query);

    const filteredRef = referrals.filter(
      (referral) =>
        referral.name.toLowerCase().includes(query.toLowerCase()) ||
        referral.username.toLowerCase().includes(query.toLowerCase()) ||
        referral.address.toLowerCase().includes(query.toLowerCase()) ||
        referral.email.toLowerCase().includes(query.toLowerCase()) ||
        referral.birthday.includes(query)
    );
    setFilteredReferrals(filteredRef);

    const filteredServ = services.filter(
      (service) =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.username.toLowerCase().includes(query.toLowerCase()) ||
        service.address.toLowerCase().includes(query.toLowerCase()) ||
        service.email.toLowerCase().includes(query.toLowerCase()) ||
        service.birthday.includes(query)
    );
    setFilteredServices(filteredServ);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Candidate Home</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <SearchComponent
        placeholder="Search by referral or service ID"
        onSearch={handleSearch}
      />
      <ListCard title="Referrals" items={filteredReferrals} />
      <ListCard title="Services" items={filteredServices} />
    </div>
  );
};

export default CandidateHome;

import { useState } from "react";
import API from "../services/api";

function CreateTicket({ setTickets }) {
  const [customerId, setCustomerId] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // CustomerId validations
    if (!customerId) {
      newErrors.customerId = "CustomerId must not be null";
    } else if (!/^\d+$/.test(customerId)) {
      newErrors.customerId = "CustomerId must be an integer";
    } else if (customerId.length !== 10) {
      newErrors.customerId = "CustomerId must be exactly 10 digits";
    }

    // Description validations
    if (!description) {
      newErrors.description = "Description must not be null";
    } else if (description.trim() === "") {
      newErrors.description = "Description must not be blank";
    } else if (description.trim().length > 100) {
      newErrors.description = "Description must be 100 characters or less";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await API.post("/tickets", {
        customerId,
        description,
      });

      setTickets((prev) => [...prev, response.data]);
      setCustomerId("");
      setDescription("");
      setErrors({});
      alert("Ticket created successfully!");
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        alert(error.response?.data?.message || "Error creating ticket");
      }
    }
  };

  const handleCancel = () => {
    setCustomerId("");
    setDescription("");
    setErrors({});
  };

  return (
    <div className="card">
      <h2>Create Ticket</h2>

      {/* Customer ID Field */}
      <label>Customer ID</label>
      <input
        value={customerId}
        maxLength={10}
        placeholder="Enter 10-digit Customer ID"
        onChange={(e) => {
          const value = e.target.value;
          // Only allow digits
          if (/^\d*$/.test(value)) {
            setCustomerId(value);
            setErrors((prev) => ({ ...prev, customerId: "" }));
          }
        }}
        style={{ borderColor: errors.customerId ? "red" : "" }}
      />
      <span
        style={{
          fontSize: "12px",
          color: customerId.length === 10 ? "green" : "gray",
        }}
      >
        {customerId.length}/10 digits
      </span>
      {errors.customerId && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {errors.customerId}
        </span>
      )}

      {/* Description Field */}
      <label>Description</label>
      <textarea
        value={description}
        maxLength={100}
        placeholder="Enter description (max 100 characters)"
        onChange={(e) => {
          setDescription(e.target.value);
          setErrors((prev) => ({ ...prev, description: "" }));
        }}
        style={{
          borderColor:
            description.length === 100
              ? "red"
              : description.length > 80
              ? "orange"
              : errors.description
              ? "red"
              : "",
        }}
      />
      <span
        style={{
          fontSize: "12px",
          color:
            description.length === 100
              ? "red"
              : description.length > 80
              ? "orange"
              : "gray",
        }}
      >
        {description.length}/100 characters
      </span>
      {errors.description && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {errors.description}
        </span>
      )}

      {/* Buttons */}
      <div className="button-group">
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={customerId.length !== 10 || description.length === 0}
          style={{
            opacity: customerId.length !== 10 || description.length === 0 ? 0.5 : 1,
            cursor: customerId.length !== 10 || description.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateTicket;
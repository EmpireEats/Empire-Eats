import React, { useState } from "react";
import axios from "axios";

const YerrrForm = () => {
  const [formState, setFormState] = useState({
    text: "",
    sortingOptions: "1on1",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const postData = async (event) => {
    event.preventDefault();
    const { text, sortingOptions } = formState;

    if (text.trim()) {
      console.log("Text:", text);
      console.log("Sorting Options:", sortingOptions);

      // Here you can write the code to send a POST request to your server
      // or handle the submitted data as needed.
    } else {
      alert("Please enter a valid text.");
    }
  };

  return (
    <div>
      <form
        onSubmit={postData}
        method="POST"
      >
        <div>
          <label htmlFor="text">
            <small>Text</small>
          </label>
          <input
            name="text"
            type="text"
            value={formState.text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sortingOptions">
            <small>Sorting Options</small>
          </label>
          <select
            name="sortingOptions"
            value={formState.sortingOptions}
            onChange={handleInputChange}
          >
            <option value="1on1">1 on 1</option>
            <option value="group">Group</option>
            <option value="noPreference">No Preference</option>
          </select>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default YerrrForm;

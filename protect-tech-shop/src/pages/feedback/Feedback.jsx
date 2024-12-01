import React, { useState } from "react";
import $ from "jquery";
import { Button } from "../../components/button/Button";
import "./Feedback.css";

function FeedbackPage() {
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // A06 Fail - Vulnerable and Outdated Components:
    // The application is using an outdated version of jQuery (v3.4.9), which contains
    // known vulnerabilities, including Cross-Site Scripting (XSS) issues. This version
    // allows unsanitized user input to be injected directly into the DOM, creating
    // an opportunity for attackers to exploit XSS vulnerabilities.

    // A08 Fail - Using a insegure version of jQuery

    $("#feedback-display").html(feedback);
  };

  return (
    <div className="feedback-container">
      <h1>Feedback about Protect Tech Store</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your feedback here..."
          onChange={handleInputChange}
          rows="4"
          cols="50"
        />
        <br />
        <Button type="submit">Submit feedback</Button>
      </form>
      <h3>Seu Feedback:</h3>
      <div id="feedback-display" className="feedback-content"></div>
    </div>
  );
}

export default FeedbackPage;

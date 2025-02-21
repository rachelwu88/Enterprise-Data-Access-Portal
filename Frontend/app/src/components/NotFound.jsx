import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" style={styles.link}>Go Back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
  },
  heading: {
    fontSize: "6rem",
    margin: "0",
  },
  message: {
    fontSize: "1.5rem",
    margin: "20px 0",
  },
  link: {
    fontSize: "1.2rem",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 20px",
    border: "1px solid #fff",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default NotFound;

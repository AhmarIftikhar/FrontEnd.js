import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import imageSrc from "../../../app/assets/mobile.jpg";

export default function Home() {
  return (
    <>
      {" "}
      <Helmet>
        <title> MobileApp | Home </title>
      </Helmet>
      <div>
        <section
          className="home-section"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={8} className="text-center">
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    padding: "20px",
                  }}
                >
                  <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
                    Welcome to our Shopping Mobile App!
                  </h2>
                  <p style={{ fontSize: "18px" }}>
                    Shop anytime, anywhere with our user-friendly mobile app.
                    Browse through a wide range of products and enjoy a seamless
                    shopping experience.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

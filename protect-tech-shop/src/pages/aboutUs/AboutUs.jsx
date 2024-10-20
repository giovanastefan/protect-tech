import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Protect Tech Shop</h1>
        <p>
          Protect Tech Shop is a web application developed for educational
          purposes, focusing on demonstrating the top 10 security
          vulnerabilities listed by the OWASP (Open Web Application Security
          Project). These vulnerabilities include, but are not limited to:
          Injection flaws, Cross-Site Scripting (XSS), Broken Access Control,
          and other common threats faced by web developers.
        </p>
        <p>
          Each vulnerability is intentionally embedded in the site to educate
          developers and students about the risks and consequences of failing to
          implement best security practices. The main goal of Protect Tech Shop
          is to raise awareness about the importance of securing applications
          from the initial development phase by utilizing modern and secure
          coding techniques.
        </p>
      </div>
    </div>
  );
};

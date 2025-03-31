import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Homepage() {
  // Handle navigation link hover effect
  const handleNavHover = (event, color) => {
    event.target.style.color = color;
  };

  // Handle download button click
  const handleDownloadClick = () => {
    alert("Downloading...");
    // Simulate download functionality
    const link = document.createElement("a");
    link.href = "path_to_your_downloadable_file"; // Replace with actual file path
    link.download = "your_file_name"; // Replace with actual file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="topnav">
        <a
          className="left"
          href="#"
          onMouseEnter={(e) => handleNavHover(e, "blue")}
          onMouseLeave={(e) => handleNavHover(e, "black")}
        >
          Product
        </a>
        <a
          href="#"
          onMouseEnter={(e) => handleNavHover(e, "blue")}
          onMouseLeave={(e) => handleNavHover(e, "black")}
        >
          Teams
        </a>
        <a
          href="#"
          onMouseEnter={(e) => handleNavHover(e, "blue")}
          onMouseLeave={(e) => handleNavHover(e, "black")}
        >
          Individuals
        </a>
        <a
          href="#"
          onMouseEnter={(e) => handleNavHover(e, "blue")}
          onMouseLeave={(e) => handleNavHover(e, "black")}
        >
          Pricing
        </a>
        <Link
          to="/register"
          className="right"
          onMouseEnter={(e) => handleNavHover(e, "blue")}
          onMouseLeave={(e) => handleNavHover(e, "black")}
        >
          Register
        </Link>
        <Link
          to="/login"
          className="right"
          onMouseEnter={(e) => handleNavHover(e, "blue")}
          onMouseLeave={(e) => handleNavHover(e, "black")}
        >
          Login
        </Link>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="content">
          <h1>The Elevated Workspace</h1>
          <p>
            Write. Plan. Collaborate.
            <br />
            <br />
            Transform your ideas into action with seamless organization and teamwork.
          </p>
        </div>
        <img src="pictures/notion stolen.png" className="main-image" alt="Main" />
      </div>

      {/* Download Button */}
      <button className="downloadbutton" onClick={handleDownloadClick}>
        Download Now
      </button>

      {/* Footer Section */}
      <div className="footer">
        <h1>
          Build perfect
          <br />1
          docs, together.
        </h1>
        <div className="stuff">
          <div className="icon-text-group">
            <img src="icons/at.png" className="image" alt="At" />
            <div className="text">Built for teams to share, suggest, and comment</div>
          </div>

          <div className="icon-text-group">
            <img src="icons/cubes.png" className="image" alt="Cubes" />
            <div className="text">100+ content types to communicate any idea</div>
          </div>
        </div>
        <img src="pictures/notion1.png" className="footer-image" alt="Footer" />
      </div>

      {/* Workflow Section */}
      <div className="footer1">
        <h1>
          Your workflow.
          <br />
          Your way.
        </h1>
        <div className="stuff1">
          <div className="icon-text-group1">
            <img src="icons/to-do-list.png" className="image" alt="To-Do List" />
            <div className="text1">Tackle any project, big or small.</div>
          </div>

          <div className="icon-text-group1">
            <img src="icons/calendar.png" className="image" alt="Calendar" />
            <div className="text1">Visualize work in any format, from calendars to boards</div>
          </div>
        </div>
        <img src="pictures/notion2.png" className="footer-image" alt="Footer 2" />
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>
          Everything you need
          <br />
          to do your best work.
        </h2>

        <div className="features-grid">
          <div className="feature-card">
            <img src="icons/document.png" className="feature-icon" alt="Docs" />
            <h3>
              Docs <span className="arrow">→</span>
            </h3>
            <p>Build any page, communicate any idea.</p>
          </div>

          <div className="feature-card">
            <img src="icons/calendar (1).png" className="feature-icon" alt="Calendar" />
            <h3>
              Calendar <span className="arrow">→</span>
            </h3>
            <p>See all your commitments in one place.</p>
          </div>

          <div className="feature-card">
            <img src="icons/book.png" className="feature-icon" alt="Wiki" />
            <h3>
              Wiki <span className="arrow">→</span>
            </h3>
            <p>One home base for all your knowledge.</p>
          </div>

          <div className="feature-card">
            <img src="icons/trophy.png" className="feature-icon" alt="Goals" />
            <h3>
              Goals <span className="arrow">→</span>
            </h3>
            <p>Track progress toward what's most important.</p>
          </div>

          <div className="feature-card">
            <img src="icons/target.png" className="feature-icon" alt="Projects" />
            <h3>
              Projects <span className="arrow">→</span>
            </h3>
            <p>Manage any project from beginning to end.</p>
          </div>

          <div className="feature-card">
            <img src="icons/artificial-intelligence.png" className="feature-icon" alt="AI" />
            <h3>
              AI <span className="arrow">→</span>
            </h3>
            <p>Finds what you need. Does what you need.</p>
          </div>

          <div className="feature-card">
            <img src="icons/square.png" className="feature-icon" alt="Templates" />
            <h3>
              Templates <span className="arrow">→</span>
            </h3>
            <p>Get started with one of 30,000+ templates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

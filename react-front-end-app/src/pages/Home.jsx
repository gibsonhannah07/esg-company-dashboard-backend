import { Link } from "react-router-dom";
import "../styles/pages/Home.css";
import environmental from "../assets/environmental.png";
import governance from "../assets/governance.png";
import social from "../assets/social.png";




export default function Home() {
  return (
    <section>

      <div className="home-hero">
        <h2 className="home-hero-title"> 🌎 ESG Metrics Dashboard 👥 </h2>
        <p>
          Browse and compare companies based on three chosen Environmental,
          Social, and Governance (ESG) metrics — so you can make more informed
          decisions about the companies you work for, invest in, or buy from.
        </p>
        <Link to="/dashboard">
          <button className="btn-primary">Go to dashboard</button>
        </Link>
      </div>

      <div className="home-about">
        <p>
          Most people choose where to work, shop, and invest based on salary or
          price. But a company's Environmental, Social, and Governance (ESG)
          record tells a deeper story; how they value their workers, the planet,
          and the communities around them. This dashboard makes that information
          simple to find and easy to understand, so you can feel confident about
          your decisions.
        </p>

        <Link to="/about">
          <button className="btn-primary">Learn more about ESG</button>
        </Link>
      </div>

      <h3 className="home-section-heading">Our Metrics</h3>
      <div className="home-tiles">

        <div className="home-tile">
          <h3>🌱 Environmental</h3>
          <p>Renewable energy usage and carbon commitments</p>
          <img 
            src={environmental}
            alt="solar energy graphic " 
            className="tile-icon"
            />
        </div>

        <div className="home-tile">
          <h3>👥 Social</h3>
          <p>Women in leadership positions</p>
          <img 
            src={social}
            alt="workplace diversity graphic" 
            className="tile-icon"
            />
        </div>

        <div className="home-tile">
          <h3>🏛 Governance</h3>
          <p>CEO pay ratio compared to median employee pay</p>
          <img 
            src={governance}
            alt="graphic showing two hands and money" 
            className="tile-icon"
            />
        </div>

      </div>

    
      <div className="home-stats">
        <div className="home-stat">
          <span className="home-stat-number">20+</span>
          <span className="home-stat-label">Companies Tracked</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-number">3</span>
          <span className="home-stat-label">ESG Metrics Per Company</span>
        </div>
      </div>

    </section>
  );
}
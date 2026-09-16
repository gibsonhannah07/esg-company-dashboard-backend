import "../styles/pages/About.css";


export default function About() {
  return (
    <section className="about-section">

      <h2>About This Dashboard</h2>
      <p>
        This app tracks three <strong>Environmental, Social, and Governance (ESG) metrics </strong>
        across major companies to help users make informed decisions about the
        companies they work for, invest in, or buy from.
      </p>
      <p>
        ESG data has traditionally lived inside dense corporate reports and
        expensive research platforms. This dashboard was built to change that; 
        pulling three of the most meaningful sustainability metrics into one
        simple, browsable interface that anyone can use.
      </p>
      <p>
        This app was built with two users in mind: people entering the workforce
        or those who want to align their career choices with their values, and
        sustainability professionals looking for a simple tool to build ESG
        awareness within their organizations. However, anyone who wishes to 
        learn more about a company's impact can learn something new from this webpage!
      </p>

      <h3>What is ESG?</h3>
      <p>
        ESG stands for Environmental, Social, and Governance, three lenses for
        evaluating how responsibly a company operates beyond just financial
        performance.
      </p>

      <h3>Metrics We Track</h3>
      <p>
        There are hundreds of ESG data points a company can report. We focused
        on three that are widely reported, easy to compare, and immediately
        meaningful to someone without a finance or technology background.
      </p>

      <h3>Net Zero Goal Year</h3>
      <p>
        A company's net-zero goal is a commitment to reduce greenhouse gas
        emissions across its entire value chain, usually by 90% or more, to
        as close to zero as possible, balancing any remaining unavoidable
        emissions with permanent carbon removal by a specific year, commonly
        2050. Some companies have net zero goal years sooner, often due to
        already-implemented sustainable strategies.
      </p>

      <h3>Renewable Energy %</h3>
      <p>
        The percentage of a company's electricity sourced from renewables like
        wind and solar. When a company says it runs on 100% renewable energy, it
        means they've matched their total electricity consumption with energy
        sourced from wind, solar, hydro, or other clean sources. Note: some
        companies achieve this through renewable energy certificates rather than
        direct sourcing, which is worth understanding when reading scores.
      </p>

      <h3>Women in Leadership %</h3>
      <p>
        The percentage of senior leadership or board seats held by women. This
        measures the proportion of senior leadership positions, usually VP level
        and above, and board seats, held by women. Research consistently shows
        that diverse leadership teams produce better long-term business outcomes
        and stronger ESG performance overall.
      </p>

      <h3>CEO Pay Ratio</h3>
      <p>
        The ratio of CEO compensation to the median employee salary. Required to
        be disclosed publicly by the SEC since 2018, this ratio compares the
        CEO's total annual compensation to the median salary of all employees. A
        ratio of 300:1, for example, means the CEO earns in one day what the
        average employee earns in a year.
      </p>

      <h3>A Note on Data</h3>
      <p>
        ESG reporting is not standardized across companies or industries. The
        scores shown here are sourced from company sustainability reports and
        publicly available disclosures, and reflect the most recently available
        data. Numbers should be treated as directional rather than definitive.
        Direct sources per company can be found on each company's individual
        data card.
      </p>

      <h3>Data Sources</h3>
      <ul>
        <li>
          <a href="https://www.epa.gov/ghgemissions" target="_blank" rel="noreferrer">
            EPA Greenhouse Gas Emissions — epa.gov
          </a>
        </li>
        <li>
          <a href="https://www.msci.com" target="_blank" rel="noreferrer">
            MSCI ESG Ratings — msci.com
          </a>
        </li>
        <li>
          <a href="https://www.globalreporting.org" target="_blank" rel="noreferrer">
            GRI Standards — globalreporting.org
          </a>
        </li>
        <li>
          Individual company annual sustainability reports
        </li>
      </ul>

    </section>
  );
}
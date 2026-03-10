import "./Home.css";

// Change theme here: "dark" or "light"
const theme = "light";

const Home = () => {
  return (
    <main className={`home ${theme}`}>
      
      <section className="hero fade-in">
        <h1 className="name">Dimitrii</h1>
        <p className="title">Creative Frontend Developer</p>

        <blockquote className="quote">
          Curious by nature. Driven by growth. Always exploring.
        </blockquote>
      </section>

      <section className="section fade-in">
        <h2>A Decision That Changed Me</h2>
        <p>
          A few years ago, I made a decision to move to another country.
          It wasn't only about changing my environment — it was about
          challenging myself.
        </p>

        <p>
          Starting over in a new place forces you to adapt quickly. It teaches
          independence, resilience, and the ability to stay steady when
          everything feels unfamiliar.
        </p>

        <blockquote className="quote">
          Growth begins where comfort ends.
        </blockquote>
      </section>

      <section className="section fade-in">
        <h2>What Moves Me</h2>
        <p>
          I feel most alive when I'm moving — physically, mentally, personally.
        </p>

        <p>
          Snowboarding teaches me balance and how to get back up after every fall.
          Motorcycle rides demand presence and focus. Traveling expands my
          perspective and reminds me how much there is still to learn.
        </p>

        <blockquote className="quote">
          Momentum. Progress. Self-improvement.
        </blockquote>
      </section>

      <section className="section fade-in">
        <h2>Philosophy</h2>
        <p>
          Personal growth is not a phase for me — it's a constant direction.
        </p>

        <p>
          I actively seek new challenges. I explore unfamiliar paths.
          I test my limits.
        </p>

        <p>
          Curiosity drives me to try something new. Discipline helps me stay
          consistent. Reflection helps me grow.
        </p>

        <blockquote className="quote">
          I'm not just building projects. I'm building myself.
        </blockquote>
      </section>

      <section className="closing fade-in">
        <h2>Always exploring. Always improving.</h2>
      </section>

    </main>
  );
};

export default Home;

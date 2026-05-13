type ProjectStat = { value: string; label: string };

export interface ProjectCardProps {
  title: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  metric: string;
  techStack: string[];
  highlight?: boolean;
  stats?: ProjectStat[];
  features?: string[];
}

export function ProjectCard({
  title,
  description,
  liveUrl,
  githubUrl,
  metric,
  techStack,
  highlight = false,
  stats,
  features,
}: ProjectCardProps) {
  return (
    <div
      className="card"
      style={{
        padding: 28,
        border: highlight ? "1px solid rgba(0,212,212,0.4)" : "1px solid #1e3a5f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,212,212,0.1)",
            border: "1px solid rgba(0,212,212,0.3)",
            borderRadius: 4,
            padding: "3px 10px",
            fontFamily: "'JetBrains Mono'",
            fontSize: 10,
            color: "#00d4d4",
            letterSpacing: "0.1em",
          }}
        >
          FEATURED
        </div>
      )}
      <div
        style={{
          fontFamily: "'JetBrains Mono'",
          fontSize: 11,
          color: "#00d4d4",
          marginBottom: 8,
          letterSpacing: "0.1em",
        }}
      >
        {metric}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0", marginBottom: 12 }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, marginBottom: 20 }}>{description}</p>

      {stats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 18,
            padding: "12px 0",
            borderTop: "1px solid rgba(0,212,212,0.15)",
            borderBottom: "1px solid rgba(0,212,212,0.15)",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#00d4d4",
                  fontFamily: "'JetBrains Mono'",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {features && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {features.map((feature) => (
            <div key={feature} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#00d4d4", fontSize: 12, marginTop: 3 }}>▸</span>
              <span style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{feature}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {techStack.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {liveUrl !== "#" && (
          <button
            className="btn-primary"
            style={{ fontSize: 11, padding: "8px 16px" }}
            onClick={() => window.open(liveUrl, "_blank")}
          >
            Live ↗
          </button>
        )}
        <button
          className="btn-secondary"
          style={{ fontSize: 11, padding: "8px 16px" }}
          onClick={() => window.open(githubUrl, "_blank")}
        >
          GitHub
        </button>
      </div>
    </div>
  );
}

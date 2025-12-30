import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/articles";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [updatedArticles, setUpdatedArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("original");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [originalRes, updatedRes] = await Promise.all([
        axios.get(`${API_BASE}/articles`),
        axios.get(`${API_BASE}/articles/updated`)
      ]);

      setArticles(originalRes.data);
      setUpdatedArticles(updatedRes.data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const dataToRender =
    activeTab === "original" ? articles : updatedArticles;

  return (
    <div className="page">
      <style>{css}</style>

      <h1 className="title">Articles Dashboard</h1>

      <div className="tabs">
        <button
          className={activeTab === "original" ? "active" : ""}
          onClick={() => setActiveTab("original")}
        >
          Original Articles
        </button>
        <button
          className={activeTab === "updated" ? "active" : ""}
          onClick={() => setActiveTab("updated")}
        >
          Updated Articles
        </button>
      </div>

      {loading && <p className="status">Loading articles...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {!loading &&
          dataToRender.map((article) => (
            <div className="card" key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content.slice(0, 180)}...</p>
              <span>
                {new Date(article.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

const css = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.page {
  max-width: 1200px;
  margin: auto;
  padding: 50px 20px;
}

.title {
  text-align: center;
  margin-bottom: 45px;
  color: white;
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 50px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.tabs button {
  padding: 12px 28px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.tabs button.active {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.tabs button:hover:not(.active) {
  background: rgba(255, 255, 255, 0.1);
}

.status {
  text-align: center;
  font-size: 18px;
  color: white;
  font-weight: 500;
}

.error {
  color: #fecaca;
  text-align: center;
  background: rgba(220, 38, 38, 0.2);
  padding: 15px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  margin: 20px auto;
  max-width: 500px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover::before {
  transform: scaleX(1);
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.card h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
}

.card p {
  color: #4b5563;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

.card span {
  display: inline-block;
  margin-top: 16px;
  font-size: 13px;
  color: #9ca3af;
  font-weight: 500;
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 8px;
}
`;
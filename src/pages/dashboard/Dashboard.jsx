import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchNews } from "../../utils/api";
import NewsCard from "../../components/newsCard/NewsCard";
import SearchFilter from "../../components/searchFilter/SearchFilter";
import Charts from "../../components/charts/Charts";
import { FaMoon, FaSun } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkTheme(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem("theme", !isDarkTheme ? "dark" : "light");
  };

  useEffect(() => {
    fetchNews().then((data) => {
      const formattedData = data.map((article) => ({
        ...article,
        id: uuidv4(),
        type: article.type || "news",
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
      }));
      setNews(formattedData);
      setFilteredNews(formattedData);
    });
  }, []);

  const handleSearch = (query) => {
    const filtered = news.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.author?.toLowerCase().includes(query.toLowerCase())
    );
    applyDateFilter(filtered);
  };

  const handleDateRangeChange = () => {
    applyDateFilter(news);
  };

  const applyDateFilter = (articles) => {
    let filtered = articles;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filtered = articles.filter(
        (article) =>
          article.publishedAt &&
          article.publishedAt >= start &&
          article.publishedAt <= end
      );
    }

    setFilteredNews(filtered);
  };

  return (
    <div className={`dashboard-background ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className={`dashboard-container ${isDarkTheme ? "dark-theme" : ""}`}>
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-controls">
            <div className="dashboard-search">
              <SearchFilter onSearch={handleSearch} />
            </div>
            <div className="dashboard-date-range">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onBlur={handleDateRangeChange}
              />
            </div>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkTheme ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
            </button>
          </div>
        </header>

        <section className="charts-section">
          <Charts articles={filteredNews} darkMode={isDarkTheme} />
        </section>

        <section className="news-grid">
          {filteredNews.map((article) => (
            <NewsCard key={article.id} article={article} darkMode={isDarkTheme} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

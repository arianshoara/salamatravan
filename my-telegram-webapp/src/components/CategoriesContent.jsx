import { useState } from "react";
import "./CategoriesContent.css";
import PropTypes from "prop-types";

// ایمپورت داده‌های کتاب‌ها
import book1 from "./data/books/book1";
import book2 from "./data/books/book2";
import book3 from "./data/books/book3";
import book4 from "./data/books/book4";
import book5 from "./data/books/book5";
import book6 from "./data/books/book6";
import book7 from "./data/books/book7";
import book8 from "./data/books/book8";
import book9 from "./data/books/book9";
import book10 from "./data/books/book10";

// ایمپورت داده‌های فیلم‌ها
import fightClub from "./data/movies/fight-club";
import insideOut from "./data/movies/inside-out";
import se7en from "./data/movies/se7en";
import theSilenceOfTheLambs from "./data/movies/the-silence-of-the-lambs";
import shutterIsland from "./data/movies/shutter-island";
import oneFlewOverTheCuckoosNest from "./data/movies/one-flew-over-the-cuckoos-nest";
import aBeautifulMind from "./data/movies/a-beautiful-mind";
import memento from "./data/movies/memento";
import theDeparted from "./data/movies/the-departed";
import taxiDriver from "./data/movies/taxi-driver";

const books = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10];
const movies = [fightClub, insideOut, se7en, theSilenceOfTheLambs, shutterIsland, oneFlewOverTheCuckoosNest, aBeautifulMind, memento, theDeparted, taxiDriver];

const CategoriesContent = ({ goToView }) => {
    const [activeTab, setActiveTab] = useState("movies");
    const [selectedItem, setSelectedItem] = useState(null);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setSelectedItem(null);
    };

    // تغییر: کل آبجکت رو به جای فیلدهای خاص پاس می‌دیم
    const handleItemClick = (item, type) => setSelectedItem({ item, type });
    const handleBackToList = () => setSelectedItem(null);

    const renderList = (items, type) => (
        <div className={`${type}-list`}>
            {items.map((item) => (
                <div key={item.id} className="category-item">
                    <h3
                        onClick={() => handleItemClick(item, type)} // کل item رو پاس می‌دیم
                        className="clickable-title"
                        role="button"
                        tabIndex={0}
                        aria-label={`مشاهده جزئیات ${type === "movies" ? item.title : item.titleFa}`}
                    >
                        {type === "movies" ? item.title : item.titleFa}
                    </h3>
                    {type === "books" && <p>نویسنده: {item.author}</p>}
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );

    const renderDetail = (item, type) => (
        <div className={`${type}-detail-page`}>
            <button onClick={handleBackToList} aria-label="بازگشت به لیست">⬅ بازگشت</button>
            <div className="detail-header">
                <h2>{type === "movies" ? item.title : item.titleFa}</h2>
                {type === "books" && <p className="author">نویسنده: {item.author}</p>}
            </div>

            <div className="detail-body" style={{ flexDirection: "column", alignItems: "center" }}>
                {/* نمایش تصویر */}
                <div className="detail-image circular-image">
                    {type === "books" && item.cover ? (
                        <img src={item.cover} alt={`جلد کتاب ${item.titleFa}`} />
                    ) : (
                        type === "books" && <p>عکس کتاب پیدا نشد</p>
                    )}
                    {type === "movies" && item.imageUrl ? (
                        <img src={item.imageUrl} alt={`پوستر فیلم ${item.title}`} />
                    ) : (
                        type === "movies" && <p>عکس فیلم پیدا نشد</p>
                    )}
                </div>

                <div className="detail-text" style={{ width: "80%", textAlign: "center" }}>
                    <p className="description">{item.fullDescription || item.description}</p>

                    <div className="additional-info">
                        <h3>اطلاعات تکمیلی {type === "movies" ? "فیلم" : "کتاب"}</h3>
                        <p>شناسه: {item.id}</p>
                        {type === "movies" && item.year && <p>سال تولید: {item.year}</p>}
                        {type === "books" && item.genre && <p>ژانر: {item.genre}</p>}
                    </div>
                </div>
            </div>

            {/* مقاله و نقد و بررسی */}
            {item.article && (
                <div className="detail-section article-section">
                    <h3>مقاله مرتبط</h3>
                    <div dangerouslySetInnerHTML={{ __html: item.article }} />
                </div>
            )}

            {item.review && (
                <div className="detail-section review-section">
                    <h3>نقد و بررسی</h3>
                    <div dangerouslySetInnerHTML={{ __html: item.review }} />
                </div>
            )}
        </div>
    );

    return (
        <div className="categories-container">
            <div className="categories-tabs">
                {["movies", "books"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => handleTabChange(tab)}
                        aria-label={tab === "movies" ? "فیلم‌های روانشناسی" : "کتاب‌های پیشنهادی"}
                    >
                        {tab === "movies" ? "🎬 فیلم‌های روانشناسی" : "📚 کتاب‌های پیشنهادی"}
                    </button>
                ))}
            </div>
            <div className="categories-content-list">
                {selectedItem ? renderDetail(selectedItem.item, selectedItem.type) : 
                    activeTab === "movies" ? renderList(movies, "movies") : 
                    renderList(books, "books")}
            </div>
        </div>
    );
};

CategoriesContent.propTypes = {
    goToView: PropTypes.func.isRequired,
};

export default CategoriesContent;
import { useState } from "react";
import "./CategoriesContent.css";
//import movies from "./data/movies";
//import books from "./data/books";
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

    const handleItemClick = (item, type) => setSelectedItem({ item, type });
    const handleBackToList = () => setSelectedItem(null);

    const renderList = (items, type) => (
        <div className={`${type}-list`}>
            {items.map(({ id, title, titleFa, author, description }) => (
                <div key={id} className="category-item">
                    <h3 onClick={() => handleItemClick({ id, title, titleFa, author, description }, type)}
                        className="clickable-title" role="button" tabIndex={0} aria-label={`مشاهده جزئیات ${type === "movies" ? title : titleFa}`}>
                        {type === "movies" ? title : titleFa}
                    </h3>
                    {type === "books" && <p>نویسنده: {author}</p>}
                    <p>{description}</p>
                </div>
            ))}
        </div>
    );

    
    const renderDetail = ({ id, title, titleFa, author, description, fullDescription, year, genre, article, review, cover, imageUrl }, type) => (
        <div className={`${type}-detail-page`}>
            <button onClick={handleBackToList} aria-label="بازگشت به لیست">⬅ بازگشت</button>
            <div className="detail-header">
                <h2>{type === "movies" ? title : titleFa}</h2>
                {type === "books" && <p className="author">نویسنده: {author}</p>}
            </div>
    
            <div className="detail-body" style={{ flexDirection: 'column', alignItems: 'center' }}> {/* تغییر به flexDirection: 'column' و افزودن alignItems: 'center' */}
                {/* نمایش تصویر (جلد کتاب یا پوستر فیلم) - بخش تصویر قبل از متن */}
                <div className="detail-image circular-image"> {/* افزودن کلاس circular-image */}
                    {type === "books" && cover && <img src={cover} alt={`جلد کتاب ${titleFa}`} />}
                    {type === "movies" && imageUrl && <img src={imageUrl} alt={`پوستر فیلم ${title}`} />}
                </div>
    
                <div className="detail-text" style={{ width: '80%', textAlign: 'center' }}> {/* محدود کردن عرض متن و مرکزچین کردن متن */}
                    <p className="description">{fullDescription || description}</p>
    
                    <div className="additional-info">
                        <h3>اطلاعات تکمیلی {type === "movies" ? "فیلم" : "کتاب"}</h3>
                        <p>شناسه: {id}</p>
                        {type === "movies" && <p>سال تولید: {year}</p>}
                        {type === "books" && <p>ژانر: {genre}</p>}
                    </div>
                </div>
            </div>
    
            {/* نمایش مقاله و نقد و بررسی (بدون تغییر) */}
            {article && (
                <div className="detail-section article-section">
                    <h3>مقاله مرتبط</h3>
                    <div dangerouslySetInnerHTML={{ __html: article }} />
                </div>
            )}
    
            {review && (
                <div className="detail-section review-section">
                    <h3>نقد و بررسی</h3>
                    <div dangerouslySetInnerHTML={{ __html: review }} />
                </div>
            )}
        </div>
    );

    return (
        <div className="categories-container">
            <div className="categories-tabs">
                {["movies", "books"].map((tab) => (
                    <button key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => handleTabChange(tab)}
                        aria-label={tab === "movies" ? "فیلم‌های روانشناسی" : "کتاب‌های پیشنهادی"}>
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

import React, { useState, lazy, Suspense, useRef, useEffect } from 'react';
import './SpecializedTests.css'; // فایل CSS را اینجا import کنید

const testCategories = [
    {
        category: "تست‌های هوش و حافظه",
        tests: [
            { name: "تست هوش هیجانی (EQ) بار-آن", description: "ارزیابی جامع هوش هیجانی با تفسیر کامل.", filename: "EQBarOnTest.jsx" },
            { name: "تست هوش هیجانی (EQ) شات", description: "سنجش هوش هیجانی بر اساس مدل سالووی و مایر.", filename: "EQShatTest.jsx" },
            { name: "تست هوش IQ ریون (RAVEN)", description: "آزمون تصویری برای سنجش ضریب هوشی.", filename: "RavenIQTest.jsx" },
            { name: "تست هوش IQ کتل (فرم A)", description: "ارزیابی هوش غیرکلامی با تفسیر جامع.", filename: "CattellIQTestA.jsx" },
            { name: "تست هوش چندگانه گاردنر", description: "سنجش ۹ نوع هوش مختلف بر اساس نظریه گاردنر.", filename: "GardnerMultipleIntelligenceTest.jsx" },
            { name: "تست استعدادیابی کلیفتون (گالوپ)", description: "شناسایی ۳۴ استعداد اصلی فرد.", filename: "CliftonStrengthsFinderTest.jsx" },
            { name: "تست حافظه فعال دانیمن و کارپنتر (WMT)", description: "ارزیابی توانایی پردازش و ذخیره‌سازی اطلاعات.", filename: "DanemanCarpenterWMTTest.jsx" },
            { name: "تست دسته‌بندی کارت‌های ویسکانسین (WCST)", description: "سنجش توانایی‌های شناختی و کارکردهای اجرایی.", filename: "WisconsinCardSortingTest.jsx" },
        ],
    },
    {
        category: "تست‌های شخصیت‌شناسی",
        tests: [
            { name: "تست شخصیت‌شناسی MBTI", description: "شناسایی تیپ شخصیتی بر اساس ۱۶ نوع مختلف.", filename: "MBTITest.jsx" },
            { name: "تست دیسک (DISC)", description: "ارزیابی سبک رفتاری و شخصیتی در محیط کار و زندگی.", filename: "DISCTest.jsx" },
            { name: "تست شخصیت‌شناسی نئو (NEO PI-R) - نسخه پیشرفته", description: "سنجش پنج عامل بزرگ شخصیت با ۲۴۰ سوال.", filename: "NEO_PIR_Test.jsx" },
            { name: "تست شخصیت ۱۶ عاملی کتل (16PF)", description: "ارزیابی ۱۶ ویژگی شخصیتی مختلف.", filename: "Cattell16PFTest.jsx" },
            { name: "تست شخصیت کارآفرین (EPT)", description: "سنجش ویژگی‌های شخصیتی مرتبط با کارآفرینی.", filename: "EntrepreneurialPersonalityTest.jsx" },
            { name: "تست اهمال‌کاری تاکمن (TPS)", description: "ارزیابی میزان تعلل و به تعویق انداختن کارها.", filename: "TuckmanProcrastinationScaleTest.jsx" },
            { name: "تست طرحواره‌های ناسازگار یانگ (YEMSQ)", description: "شناسایی الگوهای فکری و رفتاری ناسازگار.", filename: "YoungSchemaQuestionnaireTest.jsx" },
            { name: "تست نیازهای اساسی گلاسر (BNQ)", description: "سنجش نیازهای اساسی بر اساس تئوری انتخاب.", filename: "BasicNeedsQuestionnaireTest.jsx" },
            { name: "تست کمال‌گرایی هیل (HPI)", description: "ارزیابی تمایلات کمال‌گرایانه در فرد.", filename: "HillPerfectionismInventoryTest.jsx" },
            { name: "تست میلون ۴ (MCMI-IV)", description: "تشخیص اختلالات شخصیت و بالینی.", filename: "MillonMCMI_IV_Test.jsx" },
            { name: "تست شخصیت‌شناسی MBTI کودکان (MMTIC)", description: "شناسایی تیپ شخصیتی کودکان ۵ تا ۱۲ ساله.", filename: "MMTICTest.jsx" },
            { name: "تست شخصیت‌شناسی MMPI فرم ۳۷۰ سوالی", description: "ارزیابی جامع ویژگی‌های شخصیتی و روانی.", filename: "MMPI_370_Test.jsx" },
            { name: "تست شخصیت‌شناسی نئو (NEO FFI) فرم کوتاه - نسخه پیشرفته", description: "سنجش پنج عامل بزرگ شخصیت با ۶۰ سوال.", filename: "NEO_FFI_Test.jsx" },
            { name: "تست شخصیت‌شناسی MMPI فرم بلند (۵۶۷ سوالی)", description: "ارزیابی دقیق ویژگی‌های شخصیتی و روانی.", filename: "MMPI_567_Test.jsx" },
            { name: "تست انگیزش تحصیلی هارتر (HEMS)", description: "سنجش میزان انگیزه در حوزه تحصیل.", filename: "HarterEducationalMotivationScaleTest.jsx" },
        ],
    },
    {
        category: "تست‌های شغلی و سازمانی",
        tests: [
            { name: "تست رغبت‌سنج استرانگ", description: "شناسایی علاقه‌مندی‌های شغلی و حرفه‌ای.", filename: "StrongInterestInventoryTest.jsx" },
            { name: "تست شخصیت کارآفرین (EPT)", description: "ارزیابی ویژگی‌های مرتبط با کارآفرینی.", filename: "EntrepreneurialPersonalityTest.jsx" },
            { name: "تست دیسک (DISC)", description: "سنجش سبک رفتاری در محیط کار.", filename: "DISCTest.jsx" },
            { name: "تست استعدادیابی کلیفتون (گالوپ)", description: "شناسایی نقاط قوت و استعدادهای فردی در محیط کاری.", filename: "CliftonStrengthsFinderWorkTest.jsx" },
        ],
    },
    {
        category: "تست‌های بالینی و تشخیصی",
        tests: [
            { name: "تست افسردگی بک (BDI-II)", description: "سنجش شدت افسردگی در افراد.", filename: "BeckDepressionInventory_II_Test.jsx" },
            { name: "تست اضطراب کتل (CAQ)", description: "ارزیابی میزان اضطراب و تنش.", filename: "CattellAnxietyQuestionnaireTest.jsx" },
            { name: "تست اضطراب کودکان اسپنس (SCAS)", description: "سنجش اضطراب در کودکان و نوجوانان.", filename: "SpenceChildrenAnxietyScaleTest.jsx" },
            { name: "تست اختلالات روانی (SCL-90)", description: "ارزیابی نشانه‌های روانی در ۹ بعد مختلف.", filename: "SCL_90_Test.jsx" },
            { name: "تست سلامت روان (GHQ)", description: "سنجش وضعیت کلی سلامت روانی.", filename: "GeneralHealthQuestionnaireTest.jsx" },
            { name: "تست میلون ۴ (MCMI-IV)", description: "تشخیص اختلالات شخصیت و بالینی.", filename: "MillonMCMI_IV_ClinicalTest.jsx" },
            { name: "تست افکار خودکشی بک (BSSI)", description: "ارزیابی تمایلات و افکار مرتبط با خودکشی.", filename: "BeckScaleForSuicidalIdeationTest.jsx" },
            { name: "تست دسته‌بندی کارت‌های ویسکانسین (WCST)", description: "سنجش توانایی‌های شناختی و اجرایی.", filename: "WisconsinCardSortingClinicalTest.jsx" },
        ],
    },
    {
        category: "تست‌های عشق و ازدواج",
        tests: [
            { name: "تست عشق استرنبرگ", description: "سنجش ابعاد مختلف عشق در روابط.", filename: "SternbergLoveTest.jsx" },
        ],
    },
    {
        category: "تست‌های روابط اجتماعی",
        tests: [
            { name: "تست هوش هیجانی (EQ) شات", description: "سنجش هوش هیجانی و توانایی مدیریت احساسات.", filename: "EQShatSocialTest.jsx" },
            { name: "تست ترس‌های قبل از ازدواج", description: "ارزیابی نگرانی‌ها و ترس‌های مرتبط با ازدواج.", filename: "PremaritalFearsTest.jsx" },
        ],
    },
    {
        category: "تست‌های خانواده",
        tests: [
            { name: "تست سبک‌های فرزندپروری بامریند (PSI)", description: "ارزیابی شیوه‌های تربیتی والدین.", filename: "BaumrindParentingStylesTest.jsx" },
            { name: "تست رضایت زناشویی انریچ (EMSS)", description: "سنجش میزان رضایت در زندگی زناشویی.", filename: "EnrichMaritalSatisfactionScaleTest.jsx" },
            { name: "تست جرات‌ورزی جنسی هالبرت (HISA)", description: "ارزیابی توانایی بیان نیازها و خواسته‌های جنسی.", filename: "HalbertIndexOfSexualAssertivenessTest.jsx" },
            { name: "تست قصه عشق (LSS)", description: "شناسایی الگوهای عاشقانه در روابط.", filename: "LoveStoryScaleTest.jsx" },
        ],
    },
    {
        category: "تست‌های سبک زندگی",
        tests: [
            { name: "تست نیازهای اساسی گلاسر (BNQ)", description: "شناسایی نیازهای اساسی و تأثیر آن‌ها بر رفتار.", filename: "BasicNeedsQuestionnaireLifestyleTest.jsx" },
            { name: "تست کمال‌گرایی هیل (HPI)", description: "سنجش تمایلات کمال‌گرایانه و تأثیر آن بر زندگی.", filename: "HillPerfectionismInventoryLifestyleTest.jsx" },
            { name: "تست ذهن‌آگاهی پنج عاملی (FFMQ)", description: "ارزیابی میزان حضور ذهن و آگاهی در لحظه.", filename: "FiveFacetMindfulnessQuestionnaireTest.jsx" },
        ],
    },
    {
        category: "تست‌های تحصیلی",
        tests: [
            { name: "تست انگیزش تحصیلی هارتر (HEMS)", description: "سنجش میزان انگیزه و علاقه به تحصیل.", filename: "HarterEducationalMotivationScaleEducationalTest.jsx" },
            { name: "تست شخصیت‌شناسی MBTI", description: "شناسایی تیپ شخصیتی و تأثیر آن بر انتخاب رشته تحصیلی.", filename: "MBTIEducationalTest.jsx" },
            { name: "تست استعدادیابی کلیفتون (گالوپ)", description: "شناسایی استعدادها و توانایی‌های فردی در زمینه تحصیلی.", filename: "CliftonStrengthsFinderEducationalTest.jsx" },
        ],
    },
    {
        category: "تست‌های رشدی و کودک",
        tests: [
            { name: "تست تشخیص اوتیسم (GARS-3)", description: "شناسایی نشانه‌های اوتیسم در کودکان و نوجوانان.", filename: "GilliamAutismRatingScale_3_Test.jsx" },
            { name: "تست افسردگی کودکان و نوجوانان ماریاکواس (CDI)", description: "سنجش علائم افسردگی در سنین 7 تا 17 سال.", filename: "ChildrensDepressionInventoryTest.jsx" },
            { name: "تست اضطراب کودکان اسپنس (SCAS)", description: "ارزیابی میزان اضطراب در کودکان و نوجوانان.", filename: "SpenceChildrenAnxietyScaleChildTest.jsx" },
        ],
    },
    {
        category: "تست‌های روانشناسی ورزش",
        tests: [
            { name: "تست انگیزش ورزشی", description: "سنجش میزان انگیزه و علاقه به فعالیت‌های ورزشی.", filename: "SportsMotivationTest.jsx" },
            { name: "تست اعتماد به نفس ورزشی", description: "ارزیابی سطح اعتماد به نفس در زمینه‌های ورزشی.", filename: "SportsConfidenceTest.jsx" },
            { name: "تست تمرکز ورزشی", description: "سنجش توانایی تمرکز و توجه در حین فعالیت‌های ورزشی.", filename: "SportsConcentrationTest.jsx" },
        ],
    },
    {
        category: "تست‌های روانشناسی معنویت",
        tests: [
            { name: "تست هوش معنوی", description: "ارزیابی توانایی درک و ارتباط با مفاهیم معنوی.", filename: "SpiritualIntelligenceTest.jsx" },
            { name: "تست باورهای دینی", description: "سنجش میزان اعتقادات و باورهای مذهبی.", filename: "ReligiousBeliefsTest.jsx" },
            { name: "تست معنا در زندگی", description: "ارزیابی میزان احساس معنا و هدفمندی در زندگی.", filename: "MeaningInLifeTest.jsx" },
        ],
    },
];

function SpecializedTests() {
    const [expandedCategory, setExpandedCategory] = useState(null); // دسته‌بندی باز شده
    const [activeTest, setActiveTest] = useState(null); // تست انتخاب‌شده
    const categoryRefs = useRef({}); // ref برای دسته‌بندی‌ها برای اسکرول نرم

    const handleCategoryClick = (categoryName) => {
        if (expandedCategory === categoryName) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(categoryName);
        }
    };

    useEffect(() => {
        // اسکرول نرم به دسته‌بندی باز شده
        if (expandedCategory && categoryRefs.current[expandedCategory]) {
            categoryRefs.current[expandedCategory].scrollIntoView({ behavior: 'smooth' });
        }
    }, [expandedCategory]);


    console.log("activeTest:", activeTest);

    // اگر یک تست انتخاب شده باشد، آن تست به‌صورت داینامیک بارگذاری می‌شود
    if (activeTest) {
        // استفاده از React.lazy برای وارد کردن داینامیک کامپوننت تست
        const TestComponent = lazy(() => import(`./SpecializedTests/${activeTest.filename}`));

        return (
            <div className="active-test-container">
                <button onClick={() => setActiveTest(null)} className="back-button">
                    بازگشت
                </button>
                <Suspense fallback={<div>در حال بارگذاری تست...</div>}>
                    <TestComponent />
                </Suspense>
            </div>
        );
    }

    return (
        <div className="specialized-tests-container">
            <h1>تست‌های تخصصی</h1>
            {testCategories.map((categoryItem, index) => (
                <div key={index} className="category-container" ref={(el) => (categoryRefs.current[categoryItem.category] = el)}>
                    <h2
                        className="category-title"
                        onClick={() => handleCategoryClick(categoryItem.category)}
                    >
                        {categoryItem.category}
                        <span className={`arrow ${expandedCategory === categoryItem.category ? 'up' : 'down'}`}></span>
                    </h2>
                    {expandedCategory === categoryItem.category && (
                        <ul className="tests-list">
                            {categoryItem.tests.map((test, testIndex) => (
                                <li
                                    key={testIndex}
                                    className="test-item"
                                    onClick={() => setActiveTest(test)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span className="test-icon">📝</span> <strong>{test.name}</strong>: {test.description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SpecializedTests;
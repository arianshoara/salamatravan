import React, { useState, useRef } from 'react';
import './EQBarOnTest.css';
import { useSpring, animated } from 'react-spring';
import { Radar } from '@nivo/radar';
import { FaStar, FaTree, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const questions = [
  {
    id: 1,
    question: "وقتی با یک تغییر غیرمنتظره در برنامه هایتان مواجه می شوید، معمولاً چه واکنشی نشان می دهید؟",
    options: [
      { text: 'به سختی با آن کنار می آیم و احساس ناامیدی می کنم.', value: 1, analysis: 'نمره پایین در انعطاف پذیری.' },
      { text: 'کمی ناراحت می شوم، اما سعی می کنم خودم را وفق دهم.', value: 2, analysis: 'انعطاف پذیری متوسط.' },
      { text: 'به سرعت خودم را با شرایط جدید وفق می دهم.', value: 3, analysis: 'انعطاف پذیری خوب.' },
      { text: 'به راحتی تغییرات را می پذیرم و به دنبال فرصت های جدید می گردم.', value: 4, analysis: 'انعطاف پذیری بسیار بالا.' },
    ]
  },
  {
    id: 2,
    question: "در یک موقعیت استرس زا، چگونه احساسات خود را مدیریت می کنید؟",
    options: [
      { text: 'اغلب احساس می کنم غرق شده ام و نمی توانم احساساتم را کنترل کنم.', value: 1, analysis: 'مدیریت استرس ضعیف.' },
      { text: 'گاهی اوقات برای مدیریت احساساتم تلاش می کنم.', value: 2, analysis: 'مدیریت استرس متوسط.' },
      { text: 'معمولاً می توانم احساساتم را به طور موثر مدیریت کنم.', value: 3, analysis: 'مدیریت استرس خوب.' },
      { text: 'به طور معمول در موقعیت های استرس زا آرام و متمرکز می مانم.', value: 4, analysis: 'مدیریت استرس عالی.' },
    ]
  },
  {
    id: 3,
    question: "وقتی دیگران از شما انتقاد می کنند، واکنش شما معمولاً چگونه است؟",
    options: [
      { text: 'به شدت ناراحت و تدافعی می شوم.', value: 1, analysis: 'خودآگاهی پایین و واکنش پذیری بالا به انتقاد.' },
      { text: 'احساس ناراحتی می کنم، اما سعی می کنم به آن فکر کنم.', value: 2, analysis: 'خودآگاهی و پذیرش انتقاد متوسط.' },
      { text: 'سعی می کنم انتقاد را به عنوان فرصتی برای یادگیری در نظر بگیرم.', value: 3, analysis: 'خودآگاهی خوب و تمایل به یادگیری از انتقاد.' },
      { text: 'به طور سازنده به انتقاد گوش می دهم و از آن برای بهبود خود استفاده می کنم.', value: 4, analysis: 'خودآگاهی بالا و استفاده سازنده از انتقاد.' },
    ]
  },
  {
    id: 4,
    question: "در روابط خود با دیگران، چقدر همدل و درک کننده هستید؟",
    options: [
      { text: 'به سختی می توانم احساسات دیگران را درک کنم.', value: 1, analysis: 'همدلی پایین.' },
      { text: 'گاهی اوقات می توانم احساسات دیگران را درک کنم.', value: 2, analysis: 'همدلی متوسط.' },
      { text: 'معمولاً می توانم احساسات دیگران را درک کنم و با آنها همدلی کنم.', value: 3, analysis: 'همدلی خوب.' },
      { text: 'به طور طبیعی به احساسات دیگران توجه می کنم و به آنها اهمیت می دهم.', value: 4, analysis: 'همدلی بسیار بالا.' },
    ]
  },
  {
    id: 5,
    question: "چقدر در بیان احساسات خود به دیگران راحت هستید؟",
    options: [
      { text: 'بیان احساسات برایم بسیار دشوار است.', value: 1, analysis: 'خودابرازی پایین.' },
      { text: 'فقط در شرایط خاص احساساتم را بیان می کنم.', value: 2, analysis: 'خودابرازی محدود.' },
      { text: 'معمولاً می توانم احساساتم را به طور واضح بیان کنم.', value: 3, analysis: 'خودابرازی مناسب.' },
      { text: 'به راحتی و به طور شفاف احساساتم را با دیگران در میان می گذارم.', value: 4, analysis: 'خودابرازی قوی.' },
    ]
  },
  {
    id: 6,
    question: "چقدر در تصمیم گیری های خود به احساسات خود توجه می کنید؟",
    options: [
      { text: 'سعی می کنم احساساتم را در تصمیم گیری ها نادیده بگیرم.', value: 1, analysis: 'بی توجهی به نقش احساسات در تصمیم گیری.' },
      { text: 'گاهی اوقات به احساساتم در تصمیم گیری ها توجه می کنم.', value: 2, analysis: 'توجه نسبی به احساسات در تصمیم گیری.' },
      { text: 'معمولاً احساساتم را در تصمیم گیری ها در نظر می گیرم.', value: 3, analysis: 'توجه مناسب به احساسات در تصمیم گیری.' },
      { text: 'احساساتم نقش مهمی در تصمیم گیری های من ایفا می کنند.', value: 4, analysis: 'اهمیت قائل شدن زیاد برای احساسات در تصمیم گیری.' },
    ]
  },
  {
    id: 7,
    question: "در مواجهه با مشکلات، چقدر امیدوار و خوش بین هستید؟",
    options: [
      { text: 'اغلب احساس ناامیدی و بدبینی می کنم.', value: 1, analysis: 'امیدواری پایین.' },
      { text: 'گاهی اوقات امیدوار می شوم، اما اغلب نگران هستم.', value: 2, analysis: 'امیدواری متوسط.' },
      { text: 'معمولاً امیدوارم که مشکلات حل شوند.', value: 3, analysis: 'امیدواری خوب.' },
      { text: 'همیشه با امید و خوش بینی به مشکلات نگاه می کنم.', value: 4, analysis: 'امیدواری بسیار بالا.' },
    ]
  },
  {
    id: 8,
    question: "چقدر در ایجاد و حفظ روابط دوستانه و صمیمی موفق هستید؟",
    options: [
      { text: 'ایجاد و حفظ روابط برایم بسیار دشوار است.', value: 1, analysis: 'مهارت های ارتباطی ضعیف.' },
      { text: 'در ایجاد روابط مشکل دارم، اما سعی می کنم آنها را حفظ کنم.', value: 2, analysis: 'مهارت های ارتباطی متوسط.' },
      { text: 'معمولاً می توانم روابط خوبی با دیگران برقرار کنم و آنها را حفظ کنم.', value: 3, analysis: 'مهارت های ارتباطی خوب.' },
      { text: 'به راحتی روابط دوستانه و صمیمی ایجاد می کنم و آنها را پایدار نگه می دارم.', value: 4, analysis: 'مهارت های ارتباطی بسیار قوی.' },
    ]
  },
  {
    id: 9,
    question: "وقتی با افراد جدید ملاقات می کنید، چقدر اجتماعی و خونگرم هستید؟",
    options: [
      { text: 'در جمع های جدید احساس ناراحتی و خجالت می کنم.', value: 1, analysis: 'جامعه پذیری پایین.' },
      { text: 'برای شروع گفتگو با افراد جدید کمی مردد هستم.', value: 2, analysis: 'جامعه پذیری متوسط.' },
      { text: 'معمولاً می توانم با افراد جدید ارتباط برقرار کنم.', value: 3, analysis: 'جامعه پذیری خوب.' },
      { text: 'به راحتی با افراد جدید ارتباط برقرار می کنم و از معاشرت با آنها لذت می برم.', value: 4, analysis: 'جامعه پذیری بسیار قوی.' },
    ]
  },
  {
    id: 10,
    question: "چقدر به خودتان و توانایی هایتان اعتماد دارید؟",
    options: [
      { text: 'اعتماد به نفس پایینی دارم و به توانایی هایم شک دارم.', value: 1, analysis: 'عزت نفس پایین.' },
      { text: 'گاهی اوقات به خودم اعتماد دارم، اما اغلب تردید دارم.', value: 2, analysis: 'عزت نفس متوسط.' },
      { text: 'معمولاً به خودم و توانایی هایم اعتماد دارم.', value: 3, analysis: 'عزت نفس خوب.' },
      { text: 'اعتماد به نفس بالایی دارم و به توانایی هایم ایمان دارم.', value: 4, analysis: 'عزت نفس بسیار بالا.' },
    ]
  },
  {
    id: 11,
    question: "چقدر در شناسایی و درک احساسات خود مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم احساسات خودم را تشخیص دهم.', value: 1, analysis: 'خودآگاهی هیجانی پایین.' },
      { text: 'گاهی اوقات متوجه احساساتم می شوم، اما نه همیشه.', value: 2, analysis: 'خودآگاهی هیجانی متوسط.' },
      { text: 'معمولاً می توانم احساسات خودم را به خوبی تشخیص دهم.', value: 3, analysis: 'خودآگاهی هیجانی خوب.' },
      { text: 'به راحتی احساسات خودم را شناسایی و درک می کنم.', value: 4, analysis: 'خودآگاهی هیجانی بسیار بالا.' },
    ]
  },
  {
    id: 12,
    question: "وقتی با یک موقعیت چالش برانگیز روبرو می شوید، چه واکنشی نشان می دهید؟",
    options: [
      { text: 'سعی می کنم از موقعیت دوری کنم و احساس درماندگی می کنم.', value: 1, analysis: 'مهارت حل مسئله پایین.' },
      { text: 'برای حل مشکل تلاش می کنم، اما زود خسته می شوم.', value: 2, analysis: 'مهارت حل مسئله متوسط.' },
      { text: 'معمولاً می توانم راه حل های مناسبی برای مشکلات پیدا کنم.', value: 3, analysis: 'مهارت حل مسئله خوب.' },
      { text: 'با چالش ها با انگیزه و خلاقیت روبرو می شوم و به دنبال بهترین راه حل می گردم.', value: 4, analysis: 'مهارت حل مسئله بسیار قوی.' },
    ]
  },
  {
    id: 13,
    question: "چقدر در گوش دادن فعال و توجه به صحبت های دیگران مهارت دارید؟",
    options: [
      { text: 'اغلب حواسم پرت می شود و به صحبت های دیگران توجه نمی کنم.', value: 1, analysis: 'مهارت گوش دادن فعال پایین.' },
      { text: 'گاهی اوقات به صحبت های دیگران گوش می دهم، اما تمرکز کافی ندارم.', value: 2, analysis: 'مهارت گوش دادن فعال متوسط.' },
      { text: 'معمولاً به صحبت های دیگران با دقت گوش می دهم.', value: 3, analysis: 'مهارت گوش دادن فعال خوب.' },
      { text: 'به طور کامل به صحبت های دیگران توجه می کنم و سعی می کنم منظور آنها را به خوبی درک کنم.', value: 4, analysis: 'مهارت گوش دادن فعال بسیار قوی.' },
    ]
  },
  {
    id: 14,
    question: "چقدر در حفظ آرامش خود در شرایط تنش زا مهارت دارید؟",
    options: [
      { text: 'به سرعت در شرایط تنش زا کنترل خودم را از دست می دهم.', value: 1, analysis: 'خودکنترلی پایین.' },
      { text: 'گاهی اوقات در حفظ آرامش خود در شرایط تنش زا مشکل دارم.', value: 2, analysis: 'خودکنترلی متوسط.' },
      { text: 'معمولاً می توانم در شرایط تنش زا آرامش خود را حفظ کنم.', value: 3, analysis: 'خودکنترلی خوب.' },
      { text: 'به طور معمول در شرایط تنش زا آرام و خونسرد باقی می مانم.', value: 4, analysis: 'خودکنترلی بسیار بالا.' },
    ]
  },
  {
    id: 15,
    question: "چقدر در انگیزه دادن به خود برای رسیدن به اهدافتان موفق هستید؟",
    options: [
      { text: 'به سختی می توانم خودم را برای انجام کارها انگیزه دهم.', value: 1, analysis: 'انگیزه بخشی به خود پایین.' },
      { text: 'گاهی اوقات برای انگیزه دادن به خودم تلاش می کنم.', value: 2, analysis: 'انگیزه بخشی به خود متوسط.' },
      { text: 'معمولاً می توانم خودم را برای رسیدن به اهدافم با انگیزه نگه دارم.', value: 3, analysis: 'انگیزه بخشی به خود خوب.' },
      { text: 'همیشه انگیزه بالایی برای رسیدن به اهدافم دارم.', value: 4, analysis: 'انگیزه بخشی به خود بسیار قوی.' },
    ]
  },
  {
    id: 16,
    question: "چقدر در برقراری ارتباط موثر با افراد مختلف مهارت دارید؟",
    options: [
      { text: 'برقراری ارتباط با دیگران برایم بسیار دشوار است.', value: 1, analysis: 'مهارت ارتباطی پایین.' },
      { text: 'گاهی اوقات در برقراری ارتباط موثر مشکل دارم.', value: 2, analysis: 'مهارت ارتباطی متوسط.' },
      { text: 'معمولاً می توانم ارتباط موثری با دیگران برقرار کنم.', value: 3, analysis: 'مهارت ارتباطی خوب.' },
      { text: 'به راحتی با افراد مختلف ارتباط برقرار می کنم و منظورم را به خوبی منتقل می کنم.', value: 4, analysis: 'مهارت ارتباطی بسیار قوی.' },
    ]
  },
  {
    id: 17,
    question: "چقدر در مدیریت زمان و اولویت بندی کارها مهارت دارید؟",
    options: [
      { text: 'اغلب در مدیریت زمان و انجام به موقع کارها مشکل دارم.', value: 1, analysis: 'مدیریت زمان ضعیف.' },
      { text: 'گاهی اوقات برای مدیریت زمان و اولویت بندی کارها تلاش می کنم.', value: 2, analysis: 'مدیریت زمان متوسط.' },
      { text: 'معمولاً می توانم زمانم را به خوبی مدیریت کنم و کارها را اولویت بندی کنم.', value: 3, analysis: 'مدیریت زمان خوب.' },
      { text: 'به طور موثر زمانم را مدیریت می کنم و کارها را به موقع و با برنامه ریزی انجام می دهم.', value: 4, analysis: 'مدیریت زمان عالی.' },
    ]
  },
  {
    id: 18,
    question: "چقدر در حل تعارضات و اختلافات با دیگران مهارت دارید؟",
    options: [
      { text: 'سعی می کنم از تعارضات دوری کنم و اغلب تسلیم می شوم.', value: 1, analysis: 'مهارت حل تعارض پایین.' },
      { text: 'گاهی اوقات برای حل تعارضات تلاش می کنم، اما اغلب موفق نمی شوم.', value: 2, analysis: 'مهارت حل تعارض متوسط.' },
      { text: 'معمولاً می توانم تعارضات را به طور مسالمت آمیز حل کنم.', value: 3, analysis: 'مهارت حل تعارض خوب.' },
      { text: 'به طور سازنده و با احترام به نظرات دیگران تعارضات را حل می کنم.', value: 4, analysis: 'مهارت حل تعارض بسیار قوی.' },
    ]
  },
  {
    id: 19,
    question: "چقدر در ایجاد انگیزه در دیگران و رهبری گروه مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم دیگران را انگیزه دهم و رهبری کنم.', value: 1, analysis: 'مهارت رهبری و انگیزه بخشی پایین.' },
      { text: 'گاهی اوقات برای انگیزه دادن به دیگران تلاش می کنم.', value: 2, analysis: 'مهارت رهبری و انگیزه بخشی متوسط.' },
      { text: 'معمولاً می توانم دیگران را انگیزه دهم و در گروه نقش رهبری ایفا کنم.', value: 3, analysis: 'مهارت رهبری و انگیزه بخشی خوب.' },
      { text: 'به طور طبیعی دیگران را الهام می بخشم و به عنوان یک رهبر موثر عمل می کنم.', value: 4, analysis: 'مهارت رهبری و انگیزه بخشی بسیار قوی.' },
    ]
  },
  {
    id: 20,
    question: "چقدر در نه گفتن به درخواست های نامعقول دیگران مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم به درخواست های دیگران نه بگویم و اغلب احساس نارضایتی می کنم.', value: 1, analysis: 'قاطعیت پایین.' },
      { text: 'گاهی اوقات می توانم نه بگویم، اما با احساس گناه.', value: 2, analysis: 'قاطعیت متوسط.' },
      { text: 'معمولاً می توانم به درخواست های نامعقول نه بگویم.', value: 3, analysis: 'قاطعیت خوب.' },
      { text: 'به راحتی و بدون احساس گناه به درخواست های نامعقول نه می گویم.', value: 4, analysis: 'قاطعیت بسیار بالا.' },
    ]
  },
  {
    id: 21,
    question: "در محیط کار یا تحصیل، چقدر با همکاران و همکلاسی های خود همکاری می کنید؟",
    options: [
      { text: 'ترجیح می دهم به تنهایی کار کنم و از کار گروهی اجتناب می کنم.', value: 1, analysis: 'روحیه همکاری پایین.' },
      { text: 'گاهی اوقات در کار گروهی شرکت می کنم، اما ترجیحم کار انفرادی است.', value: 2, analysis: 'روحیه همکاری متوسط.' },
      { text: 'معمولاً به خوبی با دیگران در محیط کار یا تحصیل همکاری می کنم.', value: 3, analysis: 'روحیه همکاری خوب.' },
      { text: 'از کار گروهی لذت می برم و به طور فعال در پروژه های تیمی مشارکت می کنم.', value: 4, analysis: 'روحیه همکاری بسیار قوی.' },
    ]
  },
  {
    id: 22,
    question: "چقدر در پذیرش مسئولیت اشتباهات خود مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم اشتباهاتم را بپذیرم و اغلب دیگران را مقصر می دانم.', value: 1, analysis: 'مسئولیت پذیری پایین.' },
      { text: 'گاهی اوقات اشتباهاتم را می پذیرم، اما به سختی.', value: 2, analysis: 'مسئولیت پذیری متوسط.' },
      { text: 'معمولاً اشتباهاتم را می پذیرم و سعی می کنم از آنها یاد بگیرم.', value: 3, analysis: 'مسئولیت پذیری خوب.' },
      { text: 'به راحتی مسئولیت اشتباهاتم را می پذیرم و به دنبال جبران آن هستم.', value: 4, analysis: 'مسئولیت پذیری بسیار بالا.' },
    ]
  },
  {
    id: 23,
    question: "چقدر در سازگاری با محیط های جدید و شرایط متغیر مهارت دارید؟",
    options: [
      { text: 'سازگاری با محیط های جدید برایم بسیار دشوار است.', value: 1, analysis: 'سازگاری پایین.' },
      { text: 'برای سازگاری با شرایط جدید به زمان نیاز دارم.', value: 2, analysis: 'سازگاری متوسط.' },
      { text: 'معمولاً می توانم به سرعت با محیط های جدید سازگار شوم.', value: 3, analysis: 'سازگاری خوب.' },
      { text: 'به راحتی با محیط های جدید و شرایط متغیر سازگار می شوم و از آن استقبال می کنم.', value: 4, analysis: 'سازگاری بسیار بالا.' },
    ]
  },
  {
    id: 24,
    question: "چقدر در حفظ روابط مثبت و سازنده با دیگران مهارت دارید؟",
    options: [
      { text: 'حفظ روابط مثبت برایم بسیار دشوار است و اغلب دچار سوء تفاهم می شوم.', value: 1, analysis: 'مهارت های بین فردی ضعیف.' },
      { text: 'گاهی اوقات در حفظ روابط مثبت مشکل دارم.', value: 2, analysis: 'مهارت های بین فردی متوسط.' },
      { text: 'معمولاً می توانم روابط مثبت و سازنده با دیگران حفظ کنم.', value: 3, analysis: 'مهارت های بین فردی خوب.' },
      { text: 'به طور طبیعی روابط مثبت و سازنده با دیگران ایجاد و حفظ می کنم.', value: 4, analysis: 'مهارت های بین فردی بسیار قوی.' },
    ]
  },
  {
    id: 25,
    question: "چقدر در ابراز وجود و دفاع از حقوق خود مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم از حقوق خود دفاع کنم و اغلب سکوت می کنم.', value: 1, analysis: 'ابراز وجود پایین.' },
      { text: 'گاهی اوقات از حقوق خود دفاع می کنم، اما با تردید.', value: 2, analysis: 'ابراز وجود متوسط.' },
      { text: 'معمولاً می توانم از حقوق خود به طور موثر دفاع کنم.', value: 3, analysis: 'ابراز وجود خوب.' },
      { text: 'به راحتی و با اعتماد به نفس از حقوق خود دفاع می کنم.', value: 4, analysis: 'ابراز وجود بسیار قوی.' },
    ]
  },
  {
    id: 26,
    question: "چقدر در مدیریت خشم و عصبانیت خود مهارت دارید؟",
    options: [
      { text: 'به سرعت عصبانی می شوم و کنترل خشمم را از دست می دهم.', value: 1, analysis: 'مدیریت خشم ضعیف.' },
      { text: 'گاهی اوقات در مدیریت خشمم مشکل دارم.', value: 2, analysis: 'مدیریت خشم متوسط.' },
      { text: 'معمولاً می توانم خشمم را به طور موثر مدیریت کنم.', value: 3, analysis: 'مدیریت خشم خوب.' },
      { text: 'به طور معمول در شرایط عصبانیت آرام و مسلط باقی می مانم.', value: 4, analysis: 'مدیریت خشم عالی.' },
    ]
  },
  {
    id: 27,
    question: "چقدر در حل مشکلات به صورت خلاقانه و نوآورانه مهارت دارید؟",
    options: [
      { text: 'در حل مشکلات اغلب به راه حل های تکراری و سنتی فکر می کنم.', value: 1, analysis: 'خلاقیت پایین در حل مسئله.' },
      { text: 'گاهی اوقات به دنبال راه حل های جدید می گردم.', value: 2, analysis: 'خلاقیت متوسط در حل مسئله.' },
      { text: 'معمولاً می توانم راه حل های خلاقانه برای مشکلات پیدا کنم.', value: 3, analysis: 'خلاقیت خوب در حل مسئله.' },
      { text: 'همیشه به دنبال راه حل های نوآورانه و خلاقانه برای مشکلات هستم.', value: 4, analysis: 'خلاقیت بسیار بالا در حل مسئله.' },
    ]
  },
  {
    id: 28,
    question: "چقدر در تحمل ابهام و عدم قطعیت مهارت دارید؟",
    options: [
      { text: 'ابهام و عدم قطعیت برایم بسیار آزاردهنده است.', value: 1, analysis: 'تحمل ابهام پایین.' },
      { text: 'در شرایط مبهم و نامشخص احساس ناراحتی می کنم.', value: 2, analysis: 'تحمل ابهام متوسط.' },
      { text: 'معمولاً می توانم با ابهام و عدم قطعیت کنار بیایم.', value: 3, analysis: 'تحمل ابهام خوب.' },
      { text: 'در شرایط مبهم و نامشخص آرامش خود را حفظ می کنم و به دنبال فرصت ها می گردم.', value: 4, analysis: 'تحمل ابهام بسیار بالا.' },
    ]
  },
  {
    id: 29,
    question: "چقدر در حفظ انگیزه و پشتکار در مواجهه با موانع مهارت دارید؟",
    options: [
      { text: 'به سرعت در مواجهه با موانع انگیزه ام را از دست می دهم.', value: 1, analysis: 'پشتکار پایین.' },
      { text: 'گاهی اوقات برای حفظ انگیزه در مواجهه با موانع تلاش می کنم.', value: 2, analysis: 'پشتکار متوسط.' },
      { text: 'معمولاً می توانم انگیزه ام را در مواجهه با موانع حفظ کنم.', value: 3, analysis: 'پشتکار خوب.' },
      { text: 'همیشه با انگیزه و پشتکار به دنبال غلبه بر موانع هستم.', value: 4, analysis: 'پشتکار بسیار بالا.' },
    ]
  },
  {
    id: 30,
    question: "چقدر در استفاده از شوخ طبعی و حس شوخ طبعی در موقعیت های مختلف مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم از شوخ طبعی استفاده کنم و اغلب جدی هستم.', value: 1, analysis: 'حس شوخ طبعی پایین.' },
      { text: 'گاهی اوقات از شوخ طبعی استفاده می کنم، اما نه همیشه.', value: 2, analysis: 'حس شوخ طبعی متوسط.' },
      { text: 'معمولاً می توانم از شوخ طبعی برای بهبود روابط و موقعیت ها استفاده کنم.', value: 3, analysis: 'حس شوخ طبعی خوب.' },
      { text: 'به طور طبیعی از شوخ طبعی استفاده می کنم و حس شوخ طبعی قوی دارم.', value: 4, analysis: 'حس شوخ طبعی بسیار بالا.' },
    ]
  },
  {
    id: 31,
    question: "چقدر در شناسایی نقاط قوت و ضعف خود مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم نقاط قوت و ضعف خودم را تشخیص دهم.', value: 1, analysis: 'خودآگاهی پایین.' },
      { text: 'گاهی اوقات به نقاط قوت و ضعف خودم فکر می کنم.', value: 2, analysis: 'خودآگاهی متوسط.' },
      { text: 'معمولاً می توانم نقاط قوت و ضعف خودم را شناسایی کنم.', value: 3, analysis: 'خودآگاهی خوب.' },
      { text: 'به طور دقیق نقاط قوت و ضعف خودم را می شناسم و از آنها آگاه هستم.', value: 4, analysis: 'خودآگاهی بسیار بالا.' },
    ]
  },
  {
    id: 32,
    question: "چقدر در مدیریت استرس ناشی از کار یا تحصیل مهارت دارید؟",
    options: [
      { text: 'استرس کار یا تحصیل اغلب بر من غلبه می کند.', value: 1, analysis: 'مدیریت استرس کاری/تحصیلی ضعیف.' },
      { text: 'گاهی اوقات برای مدیریت استرس کاری/تحصیلی تلاش می کنم.', value: 2, analysis: 'مدیریت استرس کاری/تحصیلی متوسط.' },
      { text: 'معمولاً می توانم استرس کاری/تحصیلی را به طور موثر مدیریت کنم.', value: 3, analysis: 'مدیریت استرس کاری/تحصیلی خوب.' },
      { text: 'به طور معمول استرس کاری/تحصیلی را به خوبی مدیریت می کنم و از آن به عنوان انگیزه استفاده می کنم.', value: 4, analysis: 'مدیریت استرس کاری/تحصیلی عالی.' },
    ]
  },
  {
    id: 33,
    question: "چقدر در ایجاد تعادل بین کار و زندگی شخصی مهارت دارید؟",
    options: [
      { text: 'تعادل بین کار و زندگی شخصی برایم بسیار دشوار است و اغلب یکی از آنها قربانی می شود.', value: 1, analysis: 'تعادل کار و زندگی ضعیف.' },
      { text: 'گاهی اوقات برای ایجاد تعادل بین کار و زندگی شخصی تلاش می کنم.', value: 2, analysis: 'تعادل کار و زندگی متوسط.' },
      { text: 'معمولاً می توانم تعادل مناسبی بین کار و زندگی شخصی برقرار کنم.', value: 3, analysis: 'تعادل کار و زندگی خوب.' },
      { text: 'به طور موثر بین کار و زندگی شخصی تعادل ایجاد می کنم و از هر دو لذت می برم.', value: 4, analysis: 'تعادل کار و زندگی عالی.' },
    ]
  },
  {
    id: 34,
    question: "چقدر در استفاده از بازخورد دیگران برای بهبود عملکرد خود مهارت دارید؟",
    options: [
      { text: 'از دریافت بازخورد انتقادی ناراحت می شوم و آن را نادیده می گیرم.', value: 1, analysis: 'پذیرش بازخورد پایین.' },
      { text: 'گاهی اوقات به بازخورد دیگران توجه می کنم، اما نه همیشه.', value: 2, analysis: 'پذیرش بازخورد متوسط.' },
      { text: 'معمولاً از بازخورد دیگران برای بهبود عملکردم استفاده می کنم.', value: 3, analysis: 'پذیرش بازخورد خوب.' },
      { text: 'به طور فعال به دنبال بازخورد دیگران هستم و از آن برای رشد و پیشرفت استفاده می کنم.', value: 4, analysis: 'پذیرش بازخورد بسیار بالا.' },
    ]
  },
  {
    id: 35,
    question: "چقدر در ایجاد محیطی مثبت و دلپذیر برای خود و دیگران مهارت دارید؟",
    options: [
      { text: 'اغلب در محیط های منفی و ناخوشایند قرار می گیرم.', value: 1, analysis: 'تاثیرگذاری منفی بر محیط.' },
      { text: 'گاهی اوقات سعی می کنم محیط را مثبت کنم، اما موفقیت محدودی دارم.', value: 2, analysis: 'تاثیرگذاری متوسط بر محیط.' },
      { text: 'معمولاً می توانم محیطی مثبت و دلپذیر برای خود و دیگران ایجاد کنم.', value: 3, analysis: 'تاثیرگذاری مثبت بر محیط.' },
      { text: 'به طور فعال در ایجاد محیطی مثبت، شاد و پرانرژی برای خود و دیگران تلاش می کنم.', value: 4, analysis: 'تاثیرگذاری بسیار مثبت بر محیط.' },
    ]
  },
  {
    id: 36,
    question: "چقدر در شناخت و احترام به تفاوت های فردی دیگران مهارت دارید؟",
    options: [
      { text: 'به سختی می توانم تفاوت های فردی دیگران را درک کنم و اغلب آنها را قضاوت می کنم.', value: 1, analysis: 'احترام به تفاوت های فردی پایین.' },
      { text: 'گاهی اوقات سعی می کنم به تفاوت های فردی دیگران احترام بگذارم.', value: 2, analysis: 'احترام به تفاوت های فردی متوسط.' },
      { text: 'معمولاً به تفاوت های فردی دیگران احترام می گذارم.', value: 3, analysis: 'احترام به تفاوت های فردی خوب.' },
      { text: 'به طور کامل تفاوت های فردی دیگران را می پذیرم و به آنها احترام می گذارم.', value: 4, analysis: 'احترام به تفاوت های فردی بسیار بالا.' },
    ]
  },
  {
    id: 37,
    question: "چقدر در حفظ آرامش و تمرکز در شرایط پرفشار مهارت دارید؟",
    options: [
      { text: 'به سرعت در شرایط پرفشار دچار اضطراب و از دست دادن تمرکز می شوم.', value: 1, analysis: 'حفظ تمرکز در فشار پایین.' },
      { text: 'گاهی اوقات در حفظ آرامش و تمرکز در شرایط پرفشار مشکل دارم.', value: 2, analysis: 'حفظ تمرکز در فشار متوسط.' },
      { text: 'معمولاً می توانم در شرایط پرفشار آرامش و تمرکزم را حفظ کنم.', value: 3, analysis: 'حفظ تمرکز در فشار خوب.' },
      { text: 'به طور معمول در شرایط پرفشار آرام، متمرکز و کارآمد باقی می مانم.', value: 4, analysis: 'حفظ تمرکز در فشار عالی.' },
    ]
  },
  {
    id: 38,
    question: "چقدر در استفاده از شبکه های اجتماعی و ارتباطات آنلاین به صورت موثر و سازنده مهارت دارید؟",
    options: [
      { text: 'اغلب در استفاده از شبکه های اجتماعی احساس سردرگمی و اتلاف وقت می کنم.', value: 1, analysis: 'مهارت استفاده از ارتباطات آنلاین ضعیف.' },
      { text: 'گاهی اوقات از شبکه های اجتماعی به صورت سازنده استفاده می کنم.', value: 2, analysis: 'مهارت استفاده از ارتباطات آنلاین متوسط.' },
      { text: 'معمولاً می توانم از شبکه های اجتماعی برای ارتباط موثر و سازنده استفاده کنم.', value: 3, analysis: 'مهارت استفاده از ارتباطات آنلاین خوب.' },
      { text: 'به طور موثر از شبکه های اجتماعی برای ارتباطات حرفه ای و شخصی و یادگیری استفاده می کنم.', value: 4, analysis: 'مهارت استفاده از ارتباطات آنلاین عالی.' },
    ]
  },
  {
    id: 39,
    question: "چقدر در پذیرش تغییرات و تحولات جدید در زندگی مهارت دارید؟",
    options: [
      { text: 'تغییرات برایم بسیار ناخوشایند است و سعی می کنم از آنها اجتناب کنم.', value: 1, analysis: 'پذیرش تغییر پایین.' },
      { text: 'برای پذیرش تغییرات جدید به زمان و تلاش زیادی نیاز دارم.', value: 2, analysis: 'پذیرش تغییر متوسط.' },
      { text: 'معمولاً می توانم تغییرات جدید را بپذیرم و با آنها سازگار شوم.', value: 3, analysis: 'پذیرش تغییر خوب.' },
      { text: 'از تغییرات جدید استقبال می کنم و آنها را فرصتی برای رشد می دانم.', value: 4, analysis: 'پذیرش تغییر بسیار بالا.' },
    ]
  },
  {
    id: 40,
    question: "چقدر در حفظ روحیه مثبت و شادابی در طول روز مهارت دارید؟",
    options: [
      { text: 'اغلب احساس خستگی، بی حوصلگی و نارضایتی می کنم.', value: 1, analysis: 'روحیه مثبت پایین.' },
      { text: 'گاهی اوقات روحیه خوبی دارم، اما اغلب احساس خستگی می کنم.', value: 2, analysis: 'روحیه مثبت متوسط.' },
      { text: 'معمولاً روحیه خوبی دارم و از روزم لذت می برم.', value: 3, analysis: 'روحیه مثبت خوب.' },
      { text: 'به طور معمول با روحیه شاد و پرانرژی روزم را سپری می کنم و به دیگران انرژی می دهم.', value: 4, analysis: 'روحیه مثبت بسیار بالا.' },
    ]
  }
];

const ResultDisplay = React.forwardRef(({ score, categories, onRestart }, ref) => {
  const socialStatus = getSocialComparison(score);

  return (
    <div className="result-container" ref={ref}>
      <button className="close-results" onClick={onRestart}>×</button>
      <div className="result-header">
        <h2>نتیجه آزمون هوش هیجانی شما</h2>
        <div className="social-comparison">
          <div className="score-display">
            <animated.span className="score-number">
              {score}%
            </animated.span>
            {socialStatus.icon}
          </div>
          <p className="comparison-text">{socialStatus.message}</p>
        </div>
      </div>

      <div className="visualization-grid">
        <EmotionalTree score={score} categories={categories} />
        <EmotionalSky score={score} categories={categories} />
      </div>

      <div className="detailed-analysis">
        <h3>تحلیل تفصیلی</h3>
        <div className="category-grid">
          {Object.entries(categories).map(([category, score]) => (
            <CategoryCard key={category} category={category} score={score} />
          ))}
        </div>
      </div>

      <button onClick={onRestart} className="restart-button">
        شروع مجدد تست
      </button>
    </div>
  );
});

const CategoryCard = ({ category, score }) => (
  <div className="category-card">
    <h4>{category}</h4>
    <div className="progress-bar">
      <animated.div 
        className="progress-fill"
        style={{
          width: `${score}%`,
          backgroundColor: `hsl(${120 * (score / 100)}, 70%, 45%)`
        }}
      />
    </div>
    <span className="category-score">{score}%</span>
  </div>
);

const getSocialComparison = (score) => {
  if (score >= 75) {
    return {
      status: 'بالاتر از میانگین جامعه',
      icon: <FaArrowUp className="comparison-icon high" />,
      message: 'شما در گروه 25% برتر جامعه از نظر هوش هیجانی قرار دارید.'
    };
  } else if (score >= 45) {
    return {
      status: 'در حد میانگین جامعه',
      icon: <FaMinus className="comparison-icon average" />,
      message: 'شما در محدوده میانگین جامعه از نظر هوش هیجانی قرار دارید.'
    };
  } else {
    return {
      status: 'پایین‌تر از میانگین جامعه',
      icon: <FaArrowDown className="comparison-icon low" />,
      message: 'با تمرین و تلاش می‌توانید هوش هیجانی خود را بهبود دهید.'
    };
  }
};

const EmotionalTree = ({ score, categories }) => {
  // استفاده از react-spring برای انیمیشن رشد درخت
  const treeHeight = Math.min(score * 4, 400);
  const trunkProps = useSpring({
    height: treeHeight,
    from: { height: 0 },
    delay: 300,
    config: { tension: 100, friction: 20 }
  });

  // انیمیشن برای برگ‌ها و شاخه‌ها
  const branchProps = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0)' },
    delay: 600,
    config: { tension: 120, friction: 14 }
  });

  // محاسبه رنگ و سبک درخت بر اساس امتیاز
  const trunkColor = score > 75 ? '#5D4037' : (score > 50 ? '#795548' : '#8D6E63');
  const trunkWidth = 20 + (score / 10);
  
  // محاسبه تعداد برگ‌ها بر اساس امتیاز
  const leafCount = Math.ceil(score / 10);
  
  // تولید ابرهای متحرک تصادفی
  const generateClouds = () => {
    const clouds = [];
    const cloudCount = 5;
    
    for (let i = 0; i < cloudCount; i++) {
      const size = 40 + Math.random() * 60;
      const top = Math.random() * 60;
      const duration = 50 + Math.random() * 50;
      const delay = Math.random() * 30;
      
      clouds.push(
        <div
          key={`cloud-${i}`}
          className="cloud"
          style={{
            width: `${size}px`,
            height: `${size * 0.6}px`,
            top: `${top}%`,
            left: `-${size}px`,
            animation: `cloudFloat ${duration}s linear ${delay}s infinite`
          }}
        />
      );
    }
    
    return clouds;
  };

  // تعریف یک متن کوتاه و مفید بر اساس امتیاز
  const getMessage = () => {
    if (score >= 75) {
      return "هوش هیجانی شما مانند درختی قوی و استوار است!";
    } else if (score >= 50) {
      return "درخت هیجانی شما در حال رشد و شکوفایی است.";
    } else {
      return "با آبیاری و مراقبت، درخت هیجانی شما می‌تواند رشد کند.";
    }
  };

  // ساخت رنگ برای هر دسته بندی
  const getCategoryColor = (category, score) => {
    return `hsl(${120 * (score / 100)}, 70%, 45%)`;
  };

  // تشخیص دستگاه موبایل
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="emotional-tree-container">
      <h3>درخت هیجانی شما</h3>
      <p className="tree-message">{getMessage()}</p>
      
      {/* ابرهای متحرک */}
      {generateClouds()}
      
      <div className="tree">
        <animated.div 
          className="tree-trunk" 
          style={{
            ...trunkProps,
            width: `${trunkWidth}px`,
            backgroundColor: trunkColor
          }}
        >
          {/* نمایش شاخه‌های اصلی */}
          {Object.entries(categories).map(([category, catScore], index) => {
            const angle = index * 90;
            const length = catScore * 1.5;
            const thickness = 6 + (catScore / 20);
            const branchColor = getCategoryColor(category, catScore);
            
            return (
              <animated.div 
                key={category}
                style={{
                  ...branchProps,
                  width: `${length}px`,
                  height: `${thickness}px`,
                  backgroundColor: branchColor,
                  transform: `rotate(${angle}deg)`,
                  position: 'absolute',
                  top: `${treeHeight * (0.3 + (index * 0.15))}px`,
                  left: '50%',
                  transformOrigin: 'left center',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  zIndex: 2
                }}
                className="tree-branch"
              >
                {!isMobile && (
                  <div className="branch-label" style={{ transform: `rotate(-${angle}deg)` }}>
                    {category}: {catScore}%
                  </div>
                )}
                
                {/* برگ‌های کوچکتر هر شاخه */}
                {Array.from({ length: Math.ceil(catScore / 20) }).map((_, leafIndex) => (
                  <div
                    key={leafIndex}
                    className="tree-leaf"
                    style={{
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: `hsl(${120 * (catScore / 100)}, 85%, 40%)`,
                      top: `${leafIndex % 2 === 0 ? -8 : 8}px`,
                      left: `${10 + (leafIndex * 15)}px`,
                      boxShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                      animation: `leafSway ${1 + (leafIndex * 0.2)}s ease-in-out infinite alternate`
                    }}
                  />
                ))}
              </animated.div>
            );
          })}
          
          {/* برگ‌های تاج درخت */}
          <animated.div className="tree-crown" style={branchProps}>
            {Array.from({ length: leafCount }).map((_, index) => {
              const angle = (index / leafCount) * 360;
              const distance = 30 + (index % 3) * 20;
              const size = 10 + (index % 5);
              const delay = index * 0.05;
              
              return (
                <div 
                  key={index}
                  className="crown-leaf"
                  style={{
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    backgroundColor: `hsl(${100 + (index * 5)}, 80%, 45%)`,
                    top: `${distance * Math.sin(angle * Math.PI / 180)}px`,
                    left: `${distance * Math.cos(angle * Math.PI / 180)}px`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                    animation: `leafPulse 3s ease-in-out ${delay}s infinite alternate`
                  }}
                />
              );
            })}
          </animated.div>
          
          <div className="tree-base"></div>
          
          {/* ریشه های درخت */}
          <div className="tree-roots">
            {Array.from({ length: 4 }).map((_, index) => {
              const angle = -45 + (index * 30);
              const length = 20 + (index * 5);
              
              return (
                <div 
                  key={index}
                  className="root"
                  style={{
                    position: 'absolute',
                    width: `${length}px`,
                    height: '3px',
                    backgroundColor: '#6D4C41',
                    bottom: '-3px',
                    left: '50%',
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'left center',
                    borderRadius: '2px'
                  }}
                />
              );
            })}
          </div>
        </animated.div>
        
        {/* زمین */}
        <div className="ground" style={{
          width: '200px',
          height: '20px',
          background: 'linear-gradient(to bottom, #8D6E63, #A1887F)',
          borderRadius: '50%',
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}></div>
        
        {/* راهنمای دسته‌بندی‌ها برای موبایل */}
        {isMobile && (
          <div className="branch-categories-legend">
            {Object.entries(categories).map(([category, catScore]) => (
              <div key={category} className="category-tag">
                <span className="category-color" style={{ 
                  backgroundColor: getCategoryColor(category, catScore)
                }}></span>
                {category}: {catScore}%
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmotionalSky = ({ score, categories }) => {
  return (
    <div className="emotional-sky-container">
      <h3>آسمان احساسی شما</h3>
      <div className="sky">
        <div className="stars-container">
          {Object.entries(categories).map(([category, catScore], index) => {
            const angle = (index / Object.keys(categories).length) * Math.PI * 2;
            const distance = (catScore / 100) * 40 + 20;
            const x = 50 + distance * Math.cos(angle);
            const y = 50 + distance * Math.sin(angle);
            
            return (
              <div 
                key={category}
                className="star-wrapper"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <FaStar 
                  className="star"
                  size={(catScore / 100) * 30 + 15}
                  color={`hsl(${60 * (catScore / 100) + 40}, 100%, 50%)`}
                />
                <div className="star-label">
                  <div>{category}</div>
                  <div className="star-score">{catScore}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EQBarOnTest = () => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [categories, setCategories] = useState({});
  const resultRef = useRef(null);

  const handleOptionChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = () => {
    if (Object.keys(answers).length === 0) {
      setScore(0);
      setCategories({
        'خودآگاهی': 0,
        'مدیریت هیجانات': 0,
        'همدلی': 0,
        'مهارت‌های اجتماعی': 0
      });
      return;
    }

    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const averageScore = totalScore / questions.length;
    
    const categoryScores = {
      'خودآگاهی': calculateCategoryScore([1, 5, 9, 13, 17]),
      'مدیریت هیجانات': calculateCategoryScore([2, 6, 10, 14, 18]),
      'همدلی': calculateCategoryScore([3, 7, 11, 15, 19]),
      'مهارت‌های اجتماعی': calculateCategoryScore([4, 8, 12, 16, 20])
    };

    setScore(Math.round(averageScore * 25));
    setCategories(categoryScores);
  };

  const calculateCategoryScore = (questionIds) => {
    const validQuestions = questionIds.filter(id => answers[id] !== undefined);
    if (validQuestions.length === 0) return 0;
    
    const categoryTotal = validQuestions.reduce((sum, id) => sum + (answers[id] || 0), 0);
    return Math.round((categoryTotal / validQuestions.length) * 25);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResults();
    setShowResult(true);
    // اسکرول به بالای صفحه برای دیدن نتایج
    window.scrollTo(0, 0);
  };

  const handleRestartTest = () => {
    setAnswers({});
    setShowResult(false);
    setScore(0);
    setCategories({});
    // اسکرول به بالای صفحه برای شروع مجدد
    window.scrollTo(0, 0);
  };

  // بررسی اینکه آیا همه سوالات پاسخ داده شده‌اند
  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  const renderQuestions = () => (
    <div className="test-questions">
      <h2>تست هوش هیجانی (EQ) بار-آن</h2>
      <p>ارزیابی جامع هوش هیجانی با تفسیر کامل</p>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="question-block">
            <p className="question-text">
              <span className="question-number">{index + 1}.</span> {q.question}
            </p>
            <div className="options-grid">
              {q.options.map((option, idx) => (
                <label 
                  key={idx} 
                  className={`option-label ${answers[q.id] === option.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option.value}
                    checked={answers[q.id] === option.value}
                    onChange={() => handleOptionChange(q.id, option.value)}
                  />
                  <span className="option-text">{option.text}</span>
                  {answers[q.id] === option.value && (
                    <span className="option-analysis">{option.analysis}</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button 
          type="submit" 
          className="submit-button"
          disabled={!allQuestionsAnswered}
        >
          {allQuestionsAnswered ? 'نمایش نتیجه' : `پاسخ داده شده: ${Object.keys(answers).length} از ${questions.length}`}
        </button>
      </form>
    </div>
  );

  return (
    <div className="eq-test-container">
      {!showResult ? renderQuestions() : (
        <ResultDisplay 
          ref={resultRef}
          score={score}
          categories={categories}
          onRestart={handleRestartTest}
        />
      )}
    </div>
  );
};

export default EQBarOnTest;
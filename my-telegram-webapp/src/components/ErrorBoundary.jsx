import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) {
      const language = document.documentElement.lang;
      const copy = {
        fa: ['این بخش بارگذاری نشد', 'می‌توانید دوباره تلاش کنید یا به صفحهٔ نخست برگردید.', 'تلاش دوباره', 'صفحهٔ نخست'],
        en: ['This section could not be loaded', 'Try again or return to the home page.', 'Try again', 'Home'],
        de: ['Dieser Bereich konnte nicht geladen werden', 'Versuchen Sie es erneut oder kehren Sie zur Startseite zurück.', 'Erneut versuchen', 'Startseite']
      }[language] || ['This section could not be loaded', 'Try again or return to the home page.', 'Try again', 'Home'];
      return <section className="empty-state" role="alert">
        <h1>{copy[0]}</h1><p>{copy[1]}</p>
        <button onClick={() => window.location.reload()}>{copy[2]}</button> <a href="/">{copy[3]}</a>
      </section>;
    }
    return this.props.children;
  }
}

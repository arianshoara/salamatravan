import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <section className="empty-state" role="alert" dir="rtl" lang="fa">
      <h1>این بخش بارگذاری نشد</h1><p>می‌توانید دوباره تلاش کنید یا به صفحهٔ نخست برگردید.</p>
      <button onClick={() => window.location.reload()}>تلاش دوباره</button> <a href="/">صفحهٔ نخست</a>
    </section>;
    return this.props.children;
  }
}

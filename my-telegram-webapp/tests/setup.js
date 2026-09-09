import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
beforeEach(() => { localStorage.clear(); window.scrollTo = vi.fn(); Element.prototype.scrollIntoView = vi.fn(); HTMLDialogElement.prototype.showModal = function () { this.open = true; }; HTMLDialogElement.prototype.close = function () { this.open = false; }; });
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

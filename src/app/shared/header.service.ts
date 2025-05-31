import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private el!: HTMLElement;
  private currentText = '';
  private cancelRequested = false;

  init(el: HTMLElement) {
    this.el = el;
    this.el.textContent = '';
  }

  async show(newText: string) {
    // 1) If it’s already showing this exact text, do nothing
    if (newText === this.currentText) {
      return;
    }
    this.currentText = newText;

    // 2) Cancel any running animation
    this.cancelRequested = true;
    await this._delay(0);

    // 3) Begin new typing sequence:
    this.cancelRequested = false;

    // Add “typing” class so the cursor appears
    this.el.classList.add('typing');

    // DELETE PHASE
    while (this.el.textContent && this.el.textContent.length > 0) {
      if (this.cancelRequested) {
        this.el.classList.remove('typing');
        return;
      }
      this.el.textContent = this.el.textContent.slice(0, -1);
      await this._delay(30);
    }

    // TYPE PHASE
    for (let i = 0; i < newText.length; i++) {
      if (this.cancelRequested) {
        this.el.classList.remove('typing');
        return;
      }
      this.el.textContent += newText[i];
      await this._delay(50);
    }

    // Remove the cursor once the full heading is typed
    this.el.classList.remove('typing');
  }

  private _delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}

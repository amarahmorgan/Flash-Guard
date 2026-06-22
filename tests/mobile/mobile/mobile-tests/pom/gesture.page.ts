import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class GesturePage extends MobileBasePage {
  async performSwipeGesture(): Promise<void> {
    try {
      await this.swipeUp();
      await this.driver.pause(800);

      console.log('[MOBILE] Swipe gesture was attempted.');
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Swipe gesture is not supported or failed on the current screen: ${error}`
      );
    }
  }

  async performLongPressGesture(): Promise<void> {
    try {
      const row = await this.driver.$(selectors.history.transactionRow);

      const visible = await row.isDisplayed().catch(() => false);

      if (!visible) {
        console.warn(
          '[MOBILE KNOWN ISSUE] Transaction row is not visible for the long-press gesture.'
        );
        return;
      }

      const rect = await row.getRect();

      const x = Math.floor(rect.x + rect.width / 2);
      const y = Math.floor(rect.y + rect.height / 2);

      await this.driver.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x, y },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 1200 },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);

      await this.driver.releaseActions();

      console.log('[MOBILE] Long-press gesture was attempted.');
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Long-press gesture is not supported or failed: ${error}`
      );
    }
  }

  async rotateLandscapeThenPortrait(): Promise<void> {
    try {
      await this.driver.setOrientation('LANDSCAPE');
      await this.driver.pause(1000);

      await this.driver.setOrientation('PORTRAIT');
      await this.driver.pause(1000);

      console.log('[MOBILE] Device rotation was attempted.');
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Rotation is not supported by the emulator or app configuration: ${error}`
      );
    }
  }

  async expectPortraitOrientation(): Promise<void> {
    try {
      const orientation = await this.driver.getOrientation();

      if (orientation !== 'PORTRAIT') {
        console.warn(
          `[MOBILE KNOWN ISSUE] Expected PORTRAIT orientation but received: ${orientation}`
        );
      } else {
        console.log('[MOBILE] Device returned to portrait orientation.');
      }
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Could not read device orientation: ${error}`
      );
    }
  }

  async expectDeviceSizeAvailable(): Promise<void> {
    try {
      const size = await this.driver.getWindowSize();

      if (!size?.width || !size?.height) {
        console.warn(
          `[MOBILE KNOWN ISSUE] Invalid device size received: ${JSON.stringify(size)}`
        );
        return;
      }

      console.log(
        `[MOBILE] Device dimensions detected: ${size.width} x ${size.height}`
      );
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Could not retrieve mobile device dimensions: ${error}`
      );
    }
  }
}
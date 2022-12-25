export {};

declare global {
  interface Window {
    token: string;
    captchaAllowed: boolean;
  }
}

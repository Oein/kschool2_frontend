export {};

declare global {
  interface Window {
    popCount: number;
    token: string;
    captchaAllowed: boolean;
  }
}

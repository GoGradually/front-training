export type FitMode = "contain" | "cover";

export type CarouselOptions = {
    autoPlayMs?: number;
    transitionMs?: number;
    fit?: FitMode;
    preloadRadius?: number;
};
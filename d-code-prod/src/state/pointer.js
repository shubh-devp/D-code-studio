// Shared mutable input state kept outside React so the render loop can read it
// every frame without triggering re-renders.

// Pointer position in normalized device coords (-1..1).
export const mouseWorld = { x: 0, y: 0 };

// Scroll state: progress is 0..1 across the whole page.
export const scrollState = { progress: 0, y: 0 };

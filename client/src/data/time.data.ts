// Kept separate from gameTime in order to avoid circular references in

// Fixed time variables used to make setting meter sizes easier to calculate. For scalable units of time use gameTime.

export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;

// Used to set frequency of meter decay and updates

export const updateInterval = 5;

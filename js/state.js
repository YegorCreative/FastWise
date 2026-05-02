// Shared mutable application state
export const state = {
    isFasting: false,
    timerInterval: null,
    startTime: null,
    goalHours: 16,
    pendingGoalHours: 16,
    get goalMs() { return this.goalHours * 3600000; }
};

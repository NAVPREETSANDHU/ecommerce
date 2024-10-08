// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

beforeAll(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
        if (/Warning:/.test(args[0])) {
            return; // Ignore React warnings
        }
        originalConsoleError(...args); // Call original console.error
    };
});
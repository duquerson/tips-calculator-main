# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

![Desktop Design](./design/desktop-design-completed.jpg)
![Mobile Design](./design/mobile-design.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/duquerson/tips-calculator-main)
- Live Site URL: [Live Site](https://tips-calculator-main.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### What I learned

This project helped me improve my React skills and learn more about state management with context API. I implemented a comprehensive tip calculator with the following features:

1. **State Management**: Used React Context API to manage the calculator state across components
2. **Input Validation**: Implemented robust input sanitization to handle various edge cases
3. **Responsive Design**: Created a fully responsive layout that works on mobile and desktop
4. **Accessibility**: Added proper ARIA attributes and keyboard navigation support
5. **Performance Optimization**: Used memoization and useCallback to optimize component rendering

Here's a code snippet I'm proud of that shows the input sanitization logic:

```javascript
const sanitize = useCallback(
	(
		next,
		{ allowDecimal = false, maxIntegerDigits = Infinity, maxDecimalDigits = Infinity } = {}
	) => {
		let s = String(next ?? '');

		if (allowDecimal) {
			s = s.replace(/[^0-9.]/g, '');
			const parts = s.split('.');
			if (parts.length > 2) {
				s = parts.shift() + '.' + parts.join('');
			}
			if (s.includes('.')) {
				const [intPart, decPart] = s.split('.');
				const intClamped = intPart.slice(0, maxIntegerDigits);
				const decClamped = decPart.slice(0, maxDecimalDigits);
				s = decClamped.length > 0 ? `${intClamped}.${decClamped}` : intClamped;
			} else {
				s = s.slice(0, maxIntegerDigits);
			}
		} else {
			s = s.replace(/\D/g, '');
			s = s.slice(0, maxIntegerDigits);
		}

		return s;
	},
	[]
);
```

### Continued development

In future projects, I want to focus on:

- Improving my TypeScript skills for better type safety
- Learning more advanced React patterns and hooks
- Exploring state management libraries like Redux or Zustand
- Improving accessibility features and testing
- Learning more about performance optimization techniques

### Useful resources

- [React Documentation](https://react.dev/) - Official React documentation that helped me understand hooks and context API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Great resource for learning Tailwind utility classes
- [MDN Web Docs](https://developer.mozilla.org/) - Excellent reference for HTML, CSS, and JavaScript
- [Frontend Mentor](https://www.frontendmentor.io/) - Platform that provided this challenge and many others to practice

## Author

- Website - [Duquerson](https://cl.linkedin.com/in/duquerson)
- Frontend Mentor - [@duquerson](https://www.frontendmentor.io/profile/yeyosoto)

- GitHub - [@duquerson](https://github.com/duquerson)

## Acknowledgments

I'd like to thank the Frontend Mentor community for providing this challenge and the opportunity to improve my frontend development skills. The detailed design files and clear requirements made it easier to focus on implementing the functionality while ensuring the UI matches the specifications.

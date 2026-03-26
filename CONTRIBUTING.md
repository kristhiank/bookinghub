# Contributing to BookingHub

First off, thanks for taking the time to contribute! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment** (OS, Node version, browser)

### Suggesting Features

Feature suggestions are welcome! Please:

- Check if the feature has already been suggested
- Provide a clear description of the feature
- Explain why this feature would be useful
- Include mockups or examples if possible

### Pull Requests

1. **Fork** the repo and create your branch from `main`
2. **Install** dependencies: `npm install`
3. **Make** your changes
4. **Test** your changes locally
5. **Lint** your code: `npm run lint`
6. **Commit** with a clear message
7. **Push** to your fork
8. **Open** a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/bookinghub.git
cd bookinghub

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Set up database
npx prisma db push
npm run db:seed

# Start development server
npm run dev
```

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Use Tailwind CSS for styling
- Write meaningful commit messages

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add booking confirmation email`
- `fix: resolve calendar date selection bug`
- `docs: update installation instructions`
- `style: improve button hover states`
- `refactor: simplify booking flow logic`

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🙌

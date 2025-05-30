# VoxTrans

**VoxTrans** is a modern video calling web application designed for seamless, real-time communication with advanced accessibility features. Built with Next.js, Clerk authentication, and Stream Video SDK, VoxTrans enables users to create, schedule, and join video meetings with ease. The app stands out by offering live closed captions and real-time translation in multiple languages, making meetings more inclusive and accessible for global teams.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Use Cases](#use-cases)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Key Features

- **Instant & Scheduled Meetings:** Start a meeting instantly or schedule one for later, with easy sharing of meeting links.
- **User Authentication:** Secure sign-in and sign-up flows powered by Clerk.
- **Personal Meeting Room:** Each user has a unique, persistent meeting room for quick access.
- **Live Closed Captions:** Automatic speech-to-text captions during calls, with support for multiple languages.
- **Real-Time Translation:** Translate captions on the fly to a language of your choice, breaking language barriers.
- **Meeting Recordings:** View and download recordings of past meetings (from the last 2 weeks).
- **Responsive UI:** Modern, mobile-friendly interface with dark mode and intuitive navigation.
- **Participant Management:** See who's in the call, manage layouts, and control your audio/video devices.
- **Copy & Share Links:** Easily copy meeting invitations to your clipboard for sharing.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Authentication:** Clerk
- **Video & Captions:** Stream Video React SDK
- **Translation:** Custom API integration for real-time caption translation

## Use Cases

- Remote team meetings
- Online classes and webinars
- Multilingual conferences
- Accessible video calls for the hearing impaired

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vox-trans.git
   cd vox-trans
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please reach out to [your-email@example.com](mailto:your-email@example.com).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

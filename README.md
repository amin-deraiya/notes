# Next.js Notes App

A notes application built with Next.js, GraphQL, Node.js, MongoDB, and Auth0 for authentication. The app focuses on providing a secure and scalable platform for storing encrypted notes while also serving as a learning project for enhancing skills in Next.js, GraphQL, Node.js, MongoDB, encryption, and security.

## Features

- **Authentication**: User authentication and authorization using Auth0.
- **Note Management**: Create, read, update, and delete encrypted notes.
- **GraphQL API**: Backend API powered by GraphQL for efficient data fetching.
- **Data Storage**: MongoDB used as the database to store notes.
- **Security**: Notes content stored encrypted for enhanced security.

## Purpose

The purpose of this application is twofold:
1. **Learning**: Gain deep knowledge and hands-on experience with Next.js, GraphQL, Node.js, MongoDB, encryption techniques, and security best practices.
2. **Community Contribution**: Provide a platform for the community to contribute, improve the application's features, and enhance the codebase structure.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js with GraphQL
- **Database**: MongoDB
- **Authentication**: Auth0
- **CSS Framework**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB instance
- Auth0 account

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/amin-deraiya/notes.git
cd notes
npm install
# or
yarn install
```

## Configuration

1. **Auth0 Configuration**: Set up your Auth0 credentials in `.env.local` file:
```bash
AUTH0_SECRET=your-auth0-secret-key
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=your-auth0-issuer-base-url
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
SECRET_KEY=your-auth0-secret-key
```

2. **.env Configuration**:
```bash
NEXT_PUBLIC_DOMAIN=http://localhost:3000/
```

3. **MongoDB Configuration**:
```bash
MONGODB_URI=your-mongodb-uri
```

## Running Locally
To start the development server:

```bash
npm run dev
# or
yarn dev
```
The app will be accessible at http://localhost:3000

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/YourFeature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/YourFeature)
5. Open a pull request
   
Please ensure your code follows the project's coding standards.


# spin-up-ping 🚀

Keep your server awake and prevent it from spinning down due to inactivity! Perfect for free-tier hosting platforms like Render, Heroku, etc.

[![NPM Version](https://img.shields.io/npm/v/spin-up-ping)](https://www.npmjs.com/package/spin-up-ping)
[![GitHub Issues](https://img.shields.io/github/issues/Muhsin-42/spin-up-ping)](https://github.com/Muhsin-42/spin-up-ping/issues)
[![License](https://img.shields.io/npm/l/spin-up-ping)](https://github.com/Muhsin-42/spin-up-ping/blob/main/LICENSE)

<!-- [![Downloads](https://img.shields.io/npm/dt/spin-up-ping)](https://www.npmjs.com/package/spin-up-ping) -->
<!-- [![GitHub Stars](https://img.shields.io/github/stars/Muhsin-42/spin-up-ping)](https://github.com/Muhsin-42/spin-up-ping/stargazers) -->

## Why spin-up-ping? 🤔

Free-tier hosting services often spin down your server after a period of inactivity (usually 15-30 minutes). This can lead to slow response times when the server needs to spin up again. `spin-up-ping` solves this by sending periodic pings to keep your server alive.

## Features ✨

- 🔄 Configurable ping intervals (minimum 5 minutes)
- 📊 Success and error callbacks for monitoring
- 🛡️ Built-in abuse prevention
- 💪 Written in TypeScript with full type support
- 🎯 Zero dependencies (except axios for HTTP requests)

## Installation 📦

```bash
# Using npm
npm install spin-up-ping

# Using yarn
yarn add spin-up-ping

# Using pnpm
pnpm add spin-up-ping
```

## Usage 💻

```typescript
import {SpinUp} from "spin-up-ping";

const pinger = new SpinUp({
  url: "https://your-server.com", // Your server URL
  intervalMinutes: 5, // Minimum 5 minutes
  onSuccess: (response) => {
    // Optional success callback
    console.log("Ping successful:", response);
  },
  onError: (error) => {
    // Optional error callback
    console.error("Ping failed:", error);
  },
});

// Start pinging
pinger.start();

// Stop pinging (if needed)
pinger.stop();
```

## API Reference 📚

### ServerPingKeeper

#### Constructor Options

```typescript
interface SpinUpOptions {
  url: string; // URL to ping
  intervalMinutes: number; // Interval between pings (min: 5)
  onSuccess?: (response: any) => void; // Success callback
  onError?: (error: Error) => void; // Error callback
}
```

#### Methods

- `start()`: Start the ping service
- `stop()`: Stop the ping service

## Common Use Cases 🎯

1. **Free Hosting Services**

   - Prevent Render, Railway.app etc from sleeping

2. **Development & Testing**
   - Keep development servers active
   - Monitor server health

## Best Practices 💡

1. Set interval slightly lower than your hosting platform's timeout
2. Implement error handling for network issues
3. Use environment variables for server URLs

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

ISC © [Muhsin Abdul Nissar](https://github.com/Muhsin-42)

## Support ⭐

If you found this package helpful, please consider giving it a star on GitHub!

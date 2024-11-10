# spin-up-ping 🚀

Keep your server awake and prevent it from spinning down due to inactivity! Perfect for free-tier hosting platforms like Render, Heroku, etc.

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

## Why spin-up-ping? 🤔

Free-tier hosting services often spin down your server after a period of inactivity (usually 15-30 minutes). This can lead to slow response times when the server needs to spin up again. `spin-up-ping` solves this by sending periodic pings to keep your server alive.

## Features ✨

- 🔄 Configurable ping intervals (minimum 5 minutes)
- 📊 Success and error callbacks for monitoring
- 🛡️ Built-in abuse prevention
- 🪵 Debug logging support
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
import {ServerPingKeeper} from "spin-up-ping";

const keeper = new ServerPingKeeper({
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
keeper.start();

// Stop pinging (if needed)
keeper.stop();
```

## API Reference 📚

### ServerPingKeeper

#### Constructor Options

```typescript
interface PingKeeperOptions {
  url: string; // URL to ping
  intervalMinutes: number; // Interval between pings (min: 5)
  onSuccess?: (response: any) => void; // Success callback
  onError?: (error: Error) => void; // Error callback
}
```

#### Methods

- `start()`: Start the ping service
- `stop()`: Stop the ping service

## Debug Logging 🐛

This package uses the `debug` module. To enable debug logs:

```bash
# In Node.js
DEBUG=server-ping-keeper node your-app.js

# In browsers
localStorage.debug = 'server-ping-keeper'
```

## Best Practices 🎯

1. Set interval slightly lower than your hosting platform's timeout
2. Consider error handling for network issues
3. Enable debug logging during development
4. Use environment variables for server URLs

## License 📄

ISC © [Muhsin Abdul Nissar]

## Contributing 🤝

1. Fork it
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -am 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Create a new Pull Request

[npm-image]: https://img.shields.io/npm/v/spin-up-ping.svg?style=flat-square
[npm-url]: https://npmjs.org/package/spin-up-ping
[npm-downloads]: https://img.shields.io/npm/dm/spin-up-ping.svg?style=flat-square

# JWT Generator for Zendesk

This project enables JWT authentication implementation for the Zendesk Messaging widget in your Help Center. It was inspired by the work of [Thomas Verschoren](https://internalnote.com/jwt-messaging) and his repository [zendesk_widget](https://github.com/verschoren/zendesk_widget).

## Prerequisites

- A Zendesk account with Help Center access
- Your Zendesk Messaging application credentials:
  - MESSAGING_APP_ID
  - MESSAGING_SECRET

## Installation

1. Open your Zendesk Guide theme and access the code editor
   1. https://support.zendesk.com/hc/en-us/articles/4408832558874-Editing-the-code-for-your-live-help-center-theme
2. Locate the `document_head.hdbs` file
3. Copy the contents of `src/zendesk-widget.html` and paste it at the end of your `document_head.hdbs` file

## Configuration

### Environment Variables

The service requires two environment variables:

```bash
MESSAGING_APP_ID=your_app_id
MESSAGING_SECRET=your_secret
```

### Docker Deployment

1. Build the image:
```bash
docker build -t zendesk-jwt .
```

2. Run the container:
```bash
docker run -e MESSAGING_SECRET=your_secret -e MESSAGING_APP_ID=your_app_id -p 3000:3000 zendesk-jwt
```

### Widget Configuration

In the `src/zendesk-widget.html` file, replace:
```javascript
url: 'https://your.server.endpoint'
```
with your deployed service URL.

## How It Works

Once installed, the widget will automatically authenticate when a user logs into your Help Center. The system:

1. Detects if the user is logged in
2. Retrieves user information via the Zendesk API
3. Generates a JWT token via your endpoint
4. Authenticates the messaging widget with the generated token

### JWT Structure

The generated token contains:
```json
{
    "alg": "HS256",
    "typ": "JWT",
    "kid": "your_app_id"
}
{
    "scope": "user",
    "name": "user_name",
    "email": "user@email.com",
    "exp": expiration_timestamp,
    "external_id": "user_id",
    "email_verified": true
}
```

## Security

- Sensitive environment variables are never stored in the Docker image
- The secret is never displayed in logs
- JWT tokens expire after 24 hours
- Authentication is required to access the service

## Support

For any questions or issues, please open an issue in this repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Credits

This project was inspired by:
- [Authenticate Zendesk Messaging](https://internalnote.com/jwt-messaging) by Thomas Verschoren
- [zendesk_widget](https://github.com/verschoren/zendesk_widget) by Thomas Verschoren
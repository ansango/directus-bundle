# M2M Context Interface Extension for Directus

This extension provides a custom interface for managing many-to-many relationships within Directus. It simplifies the process of linking items across collections, making it easier to establish and manage complex relational data structures.

## Features

- **Custom Interface**: A dedicated interface component for handling many-to-many relationships.
- **Relational Support**: Designed specifically for relational data, enhancing the Directus relational capabilities.
- **Ease of Use**: Simplifies the management of many-to-many relationships, making it more intuitive and user-friendly.

## Getting Started

To use this extension, follow the steps below to install and configure it in your Directus project.

### Prerequisites

Ensure you have Directus installed and running on your system. This extension requires Directus 9.x or newer.

### Installation

1. Clone or download this extension into your Directus project's extensions directory.

```bash
cd path/to/your/directus/extensions/
```

```bash
git clone https://github.com/ansango/directus-interface-m2m.git
```

2. Restart your Directus server to load the new extension.

```bash
npx directus start
```

### Configuration

No additional configuration is needed. Once installed, the M2M Context interface will be available in the Directus App when creating or editing fields in your collections.

## Usage

To use the M2M Context interface:

1. Navigate to the Data Model section in your Directus App.
2. Create or edit a field in a collection where you want to establish a many-to-many relationship.
3. In the Interface section, select "M2M Context" from the dropdown menu.
4. Configure any additional options as needed.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests and suggestions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

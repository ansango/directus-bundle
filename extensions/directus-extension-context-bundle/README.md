# Directus Extension Context Interface

This extension provides a custom interface for managing many-to-many relationships within Directus. It simplifies the process of linking items across collections, making it easier to establish and manage complex relational data structures.

## Features

- **Custom Interface**: A dedicated interface component for handling many-to-many relationships.
- **Relational Support**: Designed specifically for relational data, enhancing the Directus relational capabilities.
- **Ease of Use**: Simplifies the management of many-to-many relationships, making it more intuitive and user-friendly.

## Getting Started

To use this extension, follow the steps below to install and configure it in your Directus project.

### Prerequisites

Ensure you have Directus installed and running on your system. This extension requires Directus 9.26 or newer.

### Collection Requirements

To use the M2M Context interface, you need to have a collection with a field that references the parent collection. This field is used to establish the many-to-many relationship between the two collections.

You need almost 3 fields in your collection:

- **Id**: The unique identifier for each item in the collection.
- **Value**: A unique key for each item in the collection.
- **Parent**: A field that references the parent collection, establishing the many-to-many relationship.

If you want to setup Context Type to add a Type field in your collection:

- Create another collection with almost Key field.
- After create this type collection you must add a field to your main collection with the same name as the type collection name and set the type field to this field. This must be an o2m field.

### Installation

1. Clone or download this extension into your Directus project's extensions directory.

```bash
cd path/to/your/directus/extensions/
```

```bash
git clone https://tfs.globex.local/GlobalExchange/ContentManagement/_git/Contexts_Interface_Directus_Extension.git
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
2. Add a M2M Collection to your project or select an existing one. But make sure that the collection has a field with parentId field. (You need a M2M Collection with Id, Key, and ParentId fields).
3. In the Interface section, select "M2M Context" from the dropdown menu.
4. Configure any additional options as needed.
5. After saving the changes, the M2M Context interface will be available when creating or editing items in the collection.
6. You could setup limit types about context m2m collection in relational field settings.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests and suggestions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.


# como crear un contexto filtrado por tipos

## definimos una coleccion de tipo de contexto

el nombre de la coleccion deberia de tener un nombre como "context_type":

cambiamos primary_key = id a primary_key = key (para asignar posteriormente key_values),
y type a "Manually entered string", para poder crear el tipo mediante un input convencional

creamos la coleccion de tipo de contexto

agregamos un nuevo campo llamado parent que sera de tipo Relational M2O y sera recursivo con este context type,



## definimos una coleccion de contexto

creamos una nueva coleccion de contexto que deberia tener el nombre "context":


la primary_key sera id de tipo autoincremental, por lo tanto dejamos la configuracion tal y como esta.

agregamos un nuevo campo llamado type que sera de tipo Relational M2O, con el context_type creado anteriormente. Importante, la key del campo tiene que ser "type", para que se pueda filtrar por el tipo de contexto.

creamos un campo value de tipo input (string), para agregar el value del contexto.
creamos un campo parent de tipo Relational M2O, con la misma coleccion, para poder crear un contexto recursivo.

## creamos un contexto para por ejemplo una pagina web

creamos una nueva coleccion que se llame por ejemplo context_web, donde primary key es id de tipo autoincremental.

agregamos un nuevo campo que sera de tipo Context Tree Selector, ya que aqui podremos vincular las relaciones con el arbol de contextos que hemos ido formando anteriormente.

la key la llamaremos context, y seleccionaremos en la coleccion relacionada la coleccion de contexto anterior (la que define los contextos, en este caso "context", ahora se nos habilita el campo de select types, que nos permitira acotar el arbol para no escoger todos los nodos del contexto, este filtrado obviamente se hace por el campo type que hemos definido anteriormente.

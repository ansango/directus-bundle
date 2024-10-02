

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

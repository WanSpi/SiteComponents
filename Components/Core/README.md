# Core

Core component in all JavaScript components

## Parameters

```JavaScript
Core.WindowWidth
Core.WindowHeight
```

## Methods

```JavaScript
Core.GetComponent(name)
Core.AddComponent(name, component)

Core.AddListener(type, callback)
Core.RemoveListener(type, callback)

Core.ParseDOM(element)

Core.Events.AddListener(type, callback)
Core.Events.RemoveListener(type, callback)
Core.Events.AddEventType(type, config)
Core.Events.CreateEventObject(config)
Core.Events.CreateEventGroup(config)
```

## Events

```
Awake
Start
ChangeDOM
```

## EventObject

```JavaScript
EventObject.SetAddCallback(callback); // callback - function
EventObject.SetRemoveCallback(callback); // callback - function
EventObject.Trigger(eventData); // eventData - any
EventObject.GetCount();
EventObject.AddListener(callback); // callback - function
EventObject.RemoveListener(callback); // callback - function
```

## EventGroup

```JavaScript
EventGroup.SetEventObject(type, eventObject);
EventGroup.Trigger(type, eventData);
EventGroup.AddListener(type, callback);
EventGroup.RemoveListener(type, callback);
```

## Functions

```JavaScript
Random(min, max);

IsObject(ob);
IsObject(key, ob);
```

## Prototypes

#### Class methods

```JavaScript
Element.addClass(className)
Element.removeClass(className)
Element.containsClass(className)
```

#### Array

```JavaScript
Array.insert(index, el)
Array.insertArray(index, arr)

Array.unshiftArray(arr)
Array.pushArray(arr)

Array.contains(value)
Array.removeIndex(index)
Array.remove(value)
```

#### Search in array

```JavaScript
NodeList.forEach(callback, thisArg)
HTMLCollection.forEach(callback, thisArg)

NodeList.indexOf(item)
HTMLCollection.indexOf(item)

Element.getIndex()
```

#### Object

```JavaScript
Object.clone()
```

#### Nodes management

```JavaScript
Node.isVisible()
Node.insertAfter(newElement, referenceElement)
Node.removeElement()
Node.removeChilds()

NodeList.removeElements()
NodeList.addEventListener(type, listener)
NodeList.removeEventListener(type, listener)
```

#### Form data

```JavaScript
HTMLFormElement.getData()
```

#### Number methods

```JavaScript
Number.isNaN()
Number.getFormat(length)
Number.getPrice()
```

#### String methods

```JavaScript
String.toCamelCase()
```

## Files

* /Helpers/Functions.js
* /Helpers/Prototypes.js
* /Core.js
* /Events.js
* /Window.js
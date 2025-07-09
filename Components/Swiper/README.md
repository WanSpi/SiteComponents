# Swiper

Swiper

## Required components

* [Core](https://github.com/WanSpi/SiteComponents/tree/main/Components/Core)

## Create

```JavaScript
Core.Swiper.Create({
  Target:     Element
  StartEvent: function
  MoveEvent:  function
  EndEvent:   function
});
```

```JavaScript
new Core.Swiper.SwiperObject(element);
```

## SwiperObject

```JavaScript
SwiperObject.AddListener('start', callback);
SwiperObject.RemoveListener('start', callback);

SwiperObject.AddListener('move', callback);
SwiperObject.RemoveListener('move', callback);

SwiperObject.AddListener('end', callback);
SwiperObject.RemoveListener('end', callback);
```

## EventObjects

### StartEventObject

```JavaScript
{
  Target:   Element
  Type:     enum(Touch, Mouse)
  Position: PositionObject
  X:        int
  Y:        int
}
```

### MoveEventObject

```JavaScript
{
  Target:   Element
  Type:     enum(Touch, Mouse)
  Position: PositionObject
  X:        int
  Y:        int
  OffsetX:  int
  OffsetY:  int
}
```

### EndEventObject

```JavaScript
{
  Target:        Element
  Type:          enum(Touch, Mouse)
  BeginPosition: PositionObject
  EndPosition:   PositionObject
  Position:      PositionObject
  X:             int
  Y:             int
  OffsetX:       int
  OffsetY:       int
}
```

### PositionObject

```JavaScript
{
  ClientX: int
  ClientY: int
  PageX:   int
  PageY:   int
  ScreenX: int
  ScreenY: int
}
```

## Files

* /Swiper.js
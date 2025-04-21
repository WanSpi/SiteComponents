# ViewportWatcher

Viewport watcher

## Required components

* [Core](https://github.com/WanSpi/SiteComponents/tree/main/Components/Core)

## Create

```JavaScript
Core.ViewportWatcher.Create(element);
```

```JavaScript
new Core.ViewportWatcher.ViewportWatcherObject(element);
```

## Single trigger

```JavaScript
Core.ViewportWatcher.SingleTrigger(element, callback);
```

## ViewportWatcherObject

```JavaScript
ViewportWatcherObject.AddListener('show', callback);
ViewportWatcherObject.RemoveListener('show', callback);

ViewportWatcherObject.AddListener('hide', callback);
ViewportWatcherObject.RemoveListener('hide', callback);

ViewportWatcherObject.Destroy();
```

## Files

* /ViewportWatcher.js
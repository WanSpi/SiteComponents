# Tabs

Tabs module

## Required components

* [Core](https://github.com/WanSpi/SiteComponents/tree/main/Components/Core)

## Module

### HTML

```html
<div class="tabs" tabs>
  <div class="tabs-header">
    <div class="tabs-navigation">
      <!-- ForBegin -->
        <!-- IfFirst -->
          <button class="tabs-button active" type="button" tabs-button="tab-key">Label</button>
        <!-- Else -->
          <button class="tabs-button" type="button" tabs-button="tab-key">Label</button>
        <!-- IfEnd -->
      <!-- ForEnd -->
    </div>
  </div>
  <div class="tabs-body">
    <div class="tabs-container" tabs-container>
      <!-- ForBegin -->
        <!-- IfFirst -->
          <div class="tabs-box active" tabs-box="tab-key">
            <!-- Childs -->
          </div>
        <!-- Else -->
          <div class="tabs-box" tabs-box="tab-key">
            <!-- Childs -->
          </div>
        <!-- IfEnd -->
      <!-- ForEnd -->
    </div>
  </div>
</div>
```

### CSS

```css
.tabs {}

.tabs-header {}
.tabs-navigation {}

.tabs-button {}
.tabs-button.active {}

.tabs-body {}

.tabs-container {
  position: relative;
  overflow: hidden;
  transition: .2s height;
}

.tabs-box {
  z-index: 1;
  opacity: 0;
  transition: .2s opacity;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  user-select: none;
  pointer-events: none;
}
.tabs-box.active {
  z-index: 2;
  opacity: 1;
  position: relative;
  user-select: auto;
  pointer-events: auto;
}
```

## Files

* /Tabs.js
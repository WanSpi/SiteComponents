# Accordion

Accordion module

## Required components

* [Core](https://github.com/WanSpi/SiteComponents/tree/main/Components/Core)

## Module

### HTML

```html
<div class="accordion" accordion>
  <!-- ForBegin -->
    <div class="accordion-element" accordion-element>
      <button class="accordion-toggle" accordion-toggle>Toggle</button>
      <div class="accordion-box" accordion-box>
        <!-- Childs -->
      </div>
    </div>
  <!-- ForEnd -->
</div>
```

### CSS

```css
.accordion-element {}
.accordion-element.open {}

.accordion-box {
  transition: .4s;
  max-height: 0;
  overflow: hidden;
}
```

## Files

* /Accordion.js
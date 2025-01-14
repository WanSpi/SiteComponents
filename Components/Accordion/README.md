# Accordion

Accordion module

## Required components

* [Core](https://github.com/WanSpi/SiteComponents/tree/main/Components/Core)

## HTML

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
import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {
  @Input('appHighlight') highlightColor = 'rgba(99, 102, 241, 0.12)';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.highlightColor);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color var(--transition-fast)');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }
}

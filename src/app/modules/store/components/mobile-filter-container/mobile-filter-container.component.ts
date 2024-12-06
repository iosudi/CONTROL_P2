import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-filter-container',
  templateUrl: './mobile-filter-container.component.html',
  styleUrls: ['./mobile-filter-container.component.scss'],
})
export class MobileFilterContainerComponent {
  constructor(private router: Router) {}

  rangeValues: number[] = [0, 100];
  @Input() filtersOpened: boolean = true;
  @Output() menuStatusChange = new EventEmitter<boolean>();

  filterOptions = [
    { label: '80x50cm', isChecked: false, quantity: 38 },
    { label: '140x70cm', isChecked: false, quantity: 95 },
    { label: '30x40cm', isChecked: false, quantity: 94 },
    { label: '60x60cm', isChecked: false, quantity: 12 },
  ];

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

    this.toggleBodyScroll();
  }

  openFiltersMenu() {
    this.filtersOpened = true;
  }

  preventClosing(e: Event): void {
    e.stopPropagation();
  }

  closeMenu() {
    this.filtersOpened = false;
    this.menuStatusChange.emit(this.filtersOpened);
    this.toggleBodyScroll();
  }

  toggleBodyScroll(): void {
    document.body.style.overflow = this.filtersOpened ? 'hidden' : 'auto';
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<{[key: string | number]: string | number}>;
  let fixture: ComponentFixture<TableComponent<{[key: string | number]: string | number}>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

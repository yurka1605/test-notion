import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Column } from 'src/app/models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends {[key: string | number]: string | number}> {
  @Input() values!: T[];
  @Input() columns: Column[] = [];
}

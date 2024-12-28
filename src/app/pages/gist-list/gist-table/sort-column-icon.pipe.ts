import { Pipe, PipeTransform } from '@angular/core';
import { GistList } from '../../../shared/models/gists';

@Pipe({
  name: 'sortColumnIcon'
})
export class SortColumnIconPipe implements PipeTransform {
  transform(sortColumn: keyof GistList | null | undefined, currentColumn: string, sortOrder: string | undefined): string {
    if (sortColumn !== currentColumn || !sortOrder) {
      return '';
    }
    return sortOrder === 'asc' ? '▲' : '▼';
  }
}

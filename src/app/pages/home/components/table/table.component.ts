import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, Return } from '@core/services/data/data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Item } from '@shared/interfaces/item.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@UntilDestroy()
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'version',
    'isDeleted'
  ];

  public searchGroup: FormGroup;
  public dataSource: MatTableDataSource<Item>;
  public page = 0;
  public pageSize = 25;
  public sort: Sort;
  public totalLength = 0;
  public searchValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  constructor(
    private readonly dataService: DataService,
    private readonly fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.searchGroup = this.fb.group({
      search: ''
    });

    this.getData();

    this.searchGroup
      .get('search')
      .valueChanges.pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((value: string) => {
        this.searchValue = value;
        this.getData();
      });
  }

  public initDataSource(data: Item[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator;
  }

  public getCurrentPage({ pageSize, pageIndex }: PageEvent) {
    this.page = pageIndex;
    this.pageSize = pageSize;
    this.getData();
  }

  public sortData(sort: Sort) {
    this.sort = sort;
    this.getData();
  }

  public getData() {
    this.dataService
      .findAll(this.page, this.pageSize, this.sort, this.searchValue)
      .pipe(untilDestroyed(this))
      .subscribe(({ totalCount, data }: Return) => {
        this.initDataSource(data);
        this.totalLength = totalCount;
      });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '@core/services/data/data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MetaData } from '@shared/interfaces/data.interface';
import { Item } from '@shared/interfaces/item.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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

  ngOnInit(): void {
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

  initDataSource(data: Item[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator;
  }

  getCurrentPage({ pageSize, pageIndex }: PageEvent): void {
    this.page = pageIndex;
    this.pageSize = pageSize;
    this.getData();
  }

  sortData(sort: Sort): void {
    this.sort = sort;
    this.getData();
  }

  getData(): void {
    this.dataService
      .findAll(this.page, this.pageSize, this.sort, this.searchValue)
      .pipe(untilDestroyed(this))
      .subscribe(({ totalCount, data }: MetaData) => {
        this.initDataSource(data);
        this.totalLength = totalCount;
      });
  }
}

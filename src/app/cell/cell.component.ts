import { cellEnum } from './cellEnum';
import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() public piece: cellEnum = cellEnum.EMPTY;
  @Input() public row:number;
  @Input() public col:number;

  constructor() { }

  ngOnInit(): void {
  }

}

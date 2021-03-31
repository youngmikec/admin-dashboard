import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-advance-table',
  templateUrl: './advance-table.component.html',
  styleUrls: ['./advance-table.component.scss']
})
export class AdvanceTableComponent implements OnInit {

  @ViewChild(DataTableDirective, null)
  dataTable: DataTableDirective;
  dtOptions: any = {};
  data: Array<string[]>;
  columns: string[];
  @Input() tableName = 'Table';

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.dataTable.dtInstance
        .then((value: DataTables.Api) => {
          this.data = value.rows().data()
            .map(row => row.filter(col => !col.includes('<div>')))
            .toArray() as any;
          this.columns = value.columns()['context'][0].nTHead.innerText
            .split('\t')
            .map(col => col.trim())
            .filter(col => col.toLowerCase() !== 'action') as any;
        });
    }, 1000);
  }

  exportCSV() {
    const csvString: string = this.convertToCSV(this.data, this.columns);
    const url: string = this.convertToObjectURL(csvString, 'text/csv');
    this.downloadFile(url, `${this.tableName}-Report-${new Date().getTime()}.csv`);
  }

  exportPDF() {
    const doc = new jsPDF();
    const totalPagesExp = '{totalPagesCountString}';

    // @ts-ignore
    doc.autoTable({
      head: [this.columns],
      body: this.data,
      didDrawPage: (data) => {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        doc.text(`${this.tableName} Report`, data.settings.margin.left, 22);

        // Footer
        let str = 'Page ' + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: {top: 30}
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save(`${this.tableName}-Report-${new Date().getTime()}.pdf`);
  }

  /**
   * Generates a download link for files and perform a click function to start the file download.
   * @param link Object URL from Window.URL.createObjectURL()
   * @param name Filename.
   */
  private downloadFile(link: string, name: string): void {
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    downloadLink.download = name;
    downloadLink.href = link;
    downloadLink.innerHTML = name;
    downloadLink.target = 'Blank';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }

  /**
   * Convert string of data into a file blob and return the object url of the blob.
   * @param data String from a stream of data.
   * @param mimeType File mime-type.
   */
  private convertToObjectURL(data: string, mimeType: string): string {
    // @ts-ignore
    window.URL = window.URL || window.webkitURL;
    const fileBlob: Blob = new Blob([data], {type: mimeType});
    return URL.createObjectURL(fileBlob);
  }

  /**
   * Convert an object to a CSV string.
   */
  private convertToCSV(values: string[][], labels: string[]): string {
    const head = labels.map(label => `"${label}"`);
    const body = values.map((row: string[]) => {
      const rows = [];
      labels.forEach((col, index) => {
        const cols = [];
        cols.push(`"${row[index]}"`);
        rows.push(cols.join(','));
      });
      return rows;
    });
    return head.join(',') + '\r\n' + body.join('\r\n');
  }

}

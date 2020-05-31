import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

export class LibraryComponent implements OnInit {

  loadedLibraries = [];
  books = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.onGetLibraryList();
  }

  onGetLibraryList() {
    const libData = [];
    this.http.get('http://localhost:9092/library/all')
      .pipe(map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            libData.push({...responseData[key]});
          }
        }
        return libData;
      }))
      .subscribe(libraries => {
        console.log(libraries);
        this.loadedLibraries = libraries;
      });
  }

  onGetBookList(lib) {
    const bookData = [];
    this.http.get('http://localhost:9092/book/library/' + lib)
      .pipe(map(res => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            bookData.push({...res[key]});
          }
        }
        return bookData;
      }))
      .subscribe(bookk => {
        console.log(bookk);
        this.books = bookk;
      });
  }
}

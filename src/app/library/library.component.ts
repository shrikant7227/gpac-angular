import {Component, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

export class LibraryComponent implements OnInit {

  loadedLibraries = [];
  books = [];
  isLoading = false;
  error = false;
  errorMessage = '';

  constructor(private service: LibraryService) {
  }

  ngOnInit() {
    this.onGetLibraryList();
  }

  onGetLibraryList() {
    this.isLoading = true;
    this.service.fetchLibrary().subscribe(response => {
      this.isLoading = false;
      this.error = false;
      this.loadedLibraries = response;
    }, error => {
      this.error = true;
      this.isLoading = false;
      this.errorMessage = error.message;
    });
  }

  onGetBookList(lib) {
    this.isLoading = true;
    this.service.fetchLibraryBook(lib).subscribe(response => {
      this.isLoading = false;
      this.error = false;
      this.books = response;
    }, error => {
      this.error = true;
      this.isLoading = false;
      this.errorMessage = error.message;
      console.log(error);
    });
  }
}

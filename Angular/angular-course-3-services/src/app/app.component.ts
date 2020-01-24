import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";
import { HighlightedDirective } from "./directives/highlighted.directive";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CourcesService } from "./services/cources.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private courseService: CourcesService) {}

  ngOnInit() {
    this.courses$ = this.courseService.loadCources();
  }

  save(cources: Course) {
    this.courseService.saveCourse(cources).subscribe(() => {
      console.log("Saved!!!");
    });
  }
}

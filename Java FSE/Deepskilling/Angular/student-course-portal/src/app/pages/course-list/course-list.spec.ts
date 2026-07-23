import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { CourseList } from './course-list';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseListComponent (NgRx Connected)', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectAllCourses, value: [] },
            { selector: selectCoursesLoading, value: false },
            { selector: selectCoursesError, value: null },
            { selector: selectEnrolledIds, value: [] }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  // Test 108/109: Component connected to NgRx Store testing
  it('should dispatch loadCourses action on initialization', () => {
    fixture.detectChanges(); // triggers ngOnInit
    expect(dispatchSpy).toHaveBeenCalledWith(loadCourses());
  });

  it('should select all courses from state store', (done) => {
    fixture.detectChanges();
    component.courses$.subscribe(courses => {
      expect(courses).toEqual([]);
      done();
    });
  });
});

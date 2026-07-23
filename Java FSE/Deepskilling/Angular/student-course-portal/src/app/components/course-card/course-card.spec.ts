import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseCard } from './course-card';
import { SimpleChange } from '@angular/core';

describe('CourseCardComponent', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: {
            enrollment: { enrolledCourseIds: [] }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  // Test 101/102: should create
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test 103: Input rendering verification
  it('should display course name in template when input is set', () => {
    component.course = {
      id: 1,
      name: 'Data Structures & Algorithms Test',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      enrolled: false
    };
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.course-name')).nativeElement;
    expect(titleEl.textContent).toContain('Data Structures & Algorithms Test');
  });

  // Test 104: Output event emitter and click handling
  it('should emit enrollRequested event when button is clicked', () => {
    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      enrolled: false
    };
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');
    
    const enrollBtn = fixture.debugElement.query(By.css('.card-footer button:last-child')).nativeElement;
    enrollBtn.click();
    
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Test 105: ngOnChanges logic check
  it('should log changes on ngOnChanges execution', () => {
    spyOn(console, 'log');
    
    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      enrolled: false
    };

    component.ngOnChanges({
      course: new SimpleChange(null, component.course, true)
    });

    expect(console.log).toHaveBeenCalledWith(
      'CourseCard [CS101] changed - Previous:', null, 'Current:', component.course
    );
  });
});

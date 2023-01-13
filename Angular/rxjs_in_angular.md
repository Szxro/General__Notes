# Some Example of use

### of$ && behaviorSubject

```ts
  private users: { name: string }[] = [{ name: 'Sebastian' }, { name: 'Juan' }];
  private of$ = of<{ name: string | null }[]>(this.users);
  private behaviorSubject$ = new BehaviorSubject<{ name: string }>({
    name: 'Prueba',
  });
  get userOf$() {
    return this.of$;
  }

  get userBehavior$() {
    return this.behaviorSubject$;
  }

  ngOnInit(): void {
    //Of Observable
    this.of$.subscribe(console.log);
    //Behavior Subject
    this.behaviorSubject$.next({ name: null });
    this.behaviorSubject$
      .pipe(filter((x) => x.name != null))
      .subscribe(console.log);
    this.behaviorSubject$.next({ name: 'Sebastian' });
    setTimeout(() => this.behaviorSubject$.next({ name: 'Juan' }), 1500);
  }
```

```html
<h2>Iterating in a observable type (of) using the async pipe</h2>
<div *ngFor="let user of userOf$ | async">
  <p>{{ user.name }}</p>
</div>
<hr />
<h2>Showing the last value that exist in the behavior subject</h2>
<div *ngIf="userBehavior$ | async as user">{{ user.name }}</div>
<!--Better way like the usual userBehavior$ | async {{user.name? | async}}-->
```

> interval can be use like the useBehavior$

# Custom Unsuscribed

```ts
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export abstract class UnSub implements OnDestroy {
  subject$ = new Subject<void>();

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
```

```ts
//component.ts extends
data$ = interval(1000);

ngOnInit(){
  this.data$.pipe(takeUntil(this.subject$)).suscribe(console.log)
}
```

> This can be use when the user change pages (when Angular execute the onDestroy its going to unsuscribed from the observable).

> abstract classes can be use to share something (method,props etc..) between classes
